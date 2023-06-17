import { Component, OnInit } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CancionesService } from 'src/app/services/canciones.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private canciones: CancionesService,
    private toastr: ToastrService
  ) {}

  song = new Audio();
  songs: any = [];

  toastConfig: Partial<IndividualConfig> = {
    progressAnimation: 'decreasing',
    extendedTimeOut: 2000,
  };

  searchText = '';
  isPaused = true;
  volume = 0.7;
  duration = 0;
  durationFormated = '00:00';
  currentTime = 0;
  currentTimeFormated = '00:00';
  currentTrack = {
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
    this.volumen(this.volume);
    this.song.addEventListener('loadedmetadata', () => {
      this.duration = this.song.duration;
      this.durationFormated = this.formatTime(this.duration);
    });
    this.getCanciones();
  }

  checkSession() {
    if (!localStorage.getItem('access_token')) {
      return true;
    }
    if (localStorage.getItem('access_token')) {
      return false;
    }
    return;
  }

  onLogout() {
    this.auth.onLogOut();
  }

  getCanciones() {
    this.canciones.getCanciones().subscribe(
      (data) => {
        this.songs = data;
      },
      (error) => {
        this.toastr.error(
          'Ha ocurrido un error inesperado al cargar las canciones.',
          '¡Error!',
          this.toastConfig
        );
        console.log(error);
        this.songs = [];
      }
    );
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
      this.song.src = environment.apiUrl + '/api/canciones/view/' + song.audio;
      console.log(this.song.src);
      this.song.load();
      this.song.play();
      this.currentTrack = song;
      this.updateInterval = setInterval(() => {
        this.currentTime = this.song.currentTime;
        this.currentTimeFormated = this.formatTime(this.currentTime);
      }, 1000);
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

  volumen(volume: any) {
    try {
      this.volume = volume.target.value;
      this.song.volume = this.volume;
    } catch (e) {
      console.log(e);
    }
  }

  muted() {
    try {
      this.volume = 0;
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
}
