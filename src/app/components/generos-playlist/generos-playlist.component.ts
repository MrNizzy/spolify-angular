import { Component, OnInit } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { currentTrackInterface } from 'src/app/models/currentTrack.interface';
import { CancionesService } from 'src/app/services/canciones.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-generos-playlist',
  templateUrl: './generos-playlist.component.html',
  styleUrls: ['./generos-playlist.component.scss'],
})
export class GenerosPlaylistComponent implements OnInit {
  constructor(
    private cancionesService: CancionesService,
    private toastr: ToastrService,
    private playerService: PlayerService
  ) {}

  generos: any;
  songs: any = [];
  searchText = '';
  playlist: currentTrackInterface[] = [];
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

  ngOnInit() {
    this.getGeneros();
    this.playerService.currentTrackObservable.subscribe((track) => {
      this.currentTrack = track;
    });
    this.playerService.playlistObservable.subscribe((playlist) => {
      this.songs = playlist;
    });
    this.playerService.searchTextObservable.subscribe((searchText) => {
      this.searchText = searchText;
    });
  }

  getGeneros() {
    this.cancionesService.getGeneros().subscribe(
      (data) => {
        this.generos = data;
      },
      (error) => {
        this.toastr.error(
          'Ha ocurrido un error inesperado al cargar las canciones.',
          '¡Error!',
          this.toastConfig
        );
        console.log(error);
        this.generos = [];
      }
    );
  }

  getCanciones() {
    this.cancionesService.getCanciones().subscribe(
      (data) => {
        this.songs = data;
        this.sendPlaylistToPlayer();
        this.onChangeCurrentTrack();
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
    console.log(genero);
    this.cancionesService.getCancionesByGenero(genero).subscribe(
      (data) => {
        this.songs = data;
        this.sendPlaylistToPlayer();
        this.onChangeCurrentTrack();
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

  onChangeCurrentTrack() {
    this.playerService.sendCurrentTrack(this.songs[0]);
  }

  sendPlaylistToPlayer() {
    this.playerService.sendPlaylist(this.songs, this.songs[0]);
  }
}
