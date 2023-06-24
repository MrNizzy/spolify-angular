import { Component, Input } from '@angular/core';
import { IndividualConfig } from 'ngx-toastr';
import { currentTrackInterface } from 'src/app/models/currentTrack.interface';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent {
  @Input() playlist: any;

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

  toastConfig: Partial<IndividualConfig> = {
    progressAnimation: 'decreasing',
    extendedTimeOut: 2000,
  };

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.playerService.currentTrackObservable.subscribe((track) => {
      this.currentTrack = track;
    });
  }

  onChangeCurrentTrack(track: currentTrackInterface) {
    this.playerService.sendCurrentTrack(track);
  }

  sendPlaylistToPlayer(
    playlist: currentTrackInterface[],
    cancion: currentTrackInterface
  ) {
    this.playerService.sendPlaylist(playlist, cancion);
  }
}
