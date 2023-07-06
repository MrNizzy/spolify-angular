import { Component } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { currentTrackInterface } from 'src/app/models/currentTrack.interface';
import { CancionesService } from 'src/app/services/canciones.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-playlist-genero',
  templateUrl: './playlist-genero.component.html',
  styleUrls: ['./playlist-genero.component.scss'],
})
export class PlaylistGeneroComponent {
  constructor(
    private canciones: CancionesService,
    private playerService: PlayerService,
    private toastr: ToastrService
  ) {}

  usuario: any;
  songs: any = [];
  currentPlaylist: currentTrackInterface[] = [];

  toastConfig: Partial<IndividualConfig> = {
    progressAnimation: 'decreasing',
    extendedTimeOut: 2000,
  };

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

  searchText = '';

  ngOnInit() {
    this.playerService.currentTrackObservable.subscribe((track) => {
      this.currentTrack = track;
    });
    this.playerService.playlistObservable.subscribe((playlist) => {
      this.currentPlaylist = playlist;
    });
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

  getCancionesByGenero(genero: string) {
    this.canciones.getCancionesByGenero(genero).subscribe(
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
