import { Component, OnDestroy, OnInit } from '@angular/core';
import { currentTrackInterface } from 'src/app/models/currentTrack.interface';
import { PlayerService } from 'src/app/services/player.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnDestroy {
  constructor(private playerService: PlayerService) {}

  song = new Audio();

  isPaused = true;
  previousVolume = 0;
  volume = 0.7;
  duration = 0;
  durationFormated = '00:00';
  currentTime = 0;
  currentTimeFormated = '00:00';
  currentPlaylist: currentTrackInterface[] = [];
  currentTrack: currentTrackInterface = {
    id: 0,
    titulo: 'Unknown Track',
    artista: 'Unknown Artist',
    album: 'Unknown Album',
    date: 'Unknown Date',
    genero: 'Unknown Genre',
    duracion: 0,
    imagen: '',
    audio: '',
    fecha_creacion: '',
    fecha_actualizacion: '',
    id_usuario: {},
  };
  updateInterval: any;

  ngOnInit() {
    this.playerService.currentTrackObservable.subscribe((track) => {
      this.currentTrack = track;
      this.openSongs(this.currentTrack);
    });
    this.playerService.playlistObservable.subscribe((playlist) => {
      this.currentPlaylist = playlist;
    });
    this.volumen(this.volume);
    this.song.addEventListener('loadedmetadata', () => {
      this.duration = this.song.duration;
      this.durationFormated = this.formatTime(this.duration);
    });
    this.playerService.stopSignal.subscribe(() => {
      this.stopSong();
    });
    this.song.addEventListener('ended', () => {
      this.playNextTrack();
    });
  }

  ngOnDestroy() {
    this.stopSong();
  }

  onChangeCurrentTrack(track: currentTrackInterface) {
    this.stopSong();

    setTimeout(() => {
      this.playerService.sendCurrentTrack(track);
      this.openSongs(track);
    }, 500);
  }

  switchPause() {
    if (this.song.src == '') {
      alert('No hay ninguna cancion cargada');
      return;
    } else {
      this.isPaused = !this.isPaused;
    }
  }

  openSongs(song: any) {
    try {
      this.stopSong();

      this.song.src = environment.apiUrl + '/api/canciones/view/' + song.audio;
      this.isPaused = false;
      this.song.load();

      this.song.addEventListener('canplaythrough', () => {
        this.song.play();
        this.updateInterval = setInterval(() => {
          this.currentTime = this.song.currentTime;
          this.currentTimeFormated = this.formatTime(this.currentTime);
        }, 1000);
      });

      this.currentTrack = song;
    } catch (e) {
      console.log(e);
      alert('Error al abrir el archivo');
      this.stopSong();
      this.song.src = '';
    }
  }

  playSong() {
    try {
      this.song.play();
      this.updateInterval = setInterval(() => {
        this.currentTime = this.song.currentTime;
        this.currentTimeFormated = this.formatTime(this.currentTime);
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  }

  pauseSong() {
    try {
      this.song.pause();
    } catch (e) {
      console.log(e);
    }
  }

  stopSong() {
    if (this.song.src != '') {
      this.song.pause();
      this.song.currentTime = 0;
      clearInterval(this.updateInterval);
      this.currentTime = 0;
      this.isPaused = true;
      this.currentTimeFormated = '00:00';
    }
  }

  playNextTrack() {
    this.playerService.getNextTrack();
  }

  playPreviousTrack() {
    this.playerService.getPreviousTrack();
  }

  volumen(volume: any) {
    try {
      this.previousVolume = this.volume;
      this.volume = volume.target.value;
      this.song.volume = this.volume;
    } catch (e) {}
  }

  muted() {
    try {
      if (this.volume === 0) {
        this.volume = this.previousVolume;
      } else {
        this.previousVolume = this.volume;
        this.volume = 0;
      }
      this.song.volume = this.volume;
    } catch (e) {
      console.log(e);
    }
  }

  getTrack() {
    return this.currentTrack;
  }

  getFileName() {
    return this.currentTrack.titulo + ' - ' + this.currentTrack.artista;
  }

  onDownload() {
    return (
      environment.apiUrl + '/api/canciones/view/' + this.currentTrack.audio
    );
  }

  openDownloadUrl(): void {
    const downloadUrl = this.onDownload();
    window.open(downloadUrl, '_blank');
  }

  private formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const minutesFormatted = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsFormatted = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutesFormatted}:${secondsFormatted}`;
  }

  seekToTime(event: any) {
    const time = parseFloat(event.target.value);
    this.song.currentTime = time;
    this.currentTime = time;
    this.currentTimeFormated = this.formatTime(time);
  }
}
