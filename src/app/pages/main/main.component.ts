import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { currentTrackInterface } from 'src/app/models/currentTrack.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CancionesService } from 'src/app/services/canciones.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private canciones: CancionesService,
    private playerService: PlayerService,
    private toastr: ToastrService,
    private jwtHelper: JwtHelperService
  ) {}

  usuario: any;
  songs: any = [];
  playlist: currentTrackInterface[] = [];

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
    this.usuario = this.onDecodeToken();
    this.playerService.currentTrackObservable.subscribe((track) => {
      this.currentTrack = track;
    });
    this.playerService.searchTextObservable.subscribe((searchText) => {
      this.searchText = searchText;
    });
  }

  onDecodeToken() {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken;
    }
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
    this.toastr.success(
      'Ha cerrado sesión con éxito.',
      '¡Éxito!',
      this.toastConfig
    );
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
