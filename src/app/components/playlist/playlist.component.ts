import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { currentTrackInterface } from 'src/app/models/currentTrack.interface';
import { cancionUpdateInterface } from 'src/app/models/updateCancion.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CancionesService } from 'src/app/services/canciones.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent {
  @Input() playlist: any;
  @Input() usuario: any;

  cancionSelectedToAction: any = [];

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

  formUpdate = this.fb.group({
    titulo: ['', [Validators.required]],
    artista: ['', [Validators.required]],
    album: ['', [Validators.required]],
    genero: ['', [Validators.required]],
    date: ['', [Validators.required]],
  });

  constructor(
    private playerService: PlayerService,
    private fb: FormBuilder,
    private cancionesService: CancionesService,
    private toastr: ToastrService
  ) {}

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

  onUpdateCancion(form: cancionUpdateInterface) {
    if (form.titulo) {
      this.cancionesService
        .updateCancion(this.cancionSelectedToAction.id, form)
        .subscribe(
          () => {
            this.getCanciones();
            this.toastr.info(
              `La canción ${this.cancionSelectedToAction.titulo} se ha actualizado correctamente`,
              '¡Editado correctamente!',
              this.toastConfig
            );
          },
          (error) => {
            this.toastr.error(
              'Ha ocurrido un error inesperado.',
              '¡Error!',
              this.toastConfig
            );
            console.log(error);
          }
        );
    }
  }

  onDeleteCancion() {
    if (this.cancionSelectedToAction.id) {
      this.cancionesService
        .deleteCancion(this.cancionSelectedToAction.id)
        .subscribe(
          () => {
            this.toastr.success(
              `Se ha eliminado la canción ${this.cancionSelectedToAction.titulo}`,
              '¡Eliminado correctamente!',
              this.toastConfig
            );
            this.getCanciones();
          },
          (error) => {
            this.toastr.error(
              'Ha ocurrido un error inesperado.',
              '¡Error!',
              this.toastConfig
            );
            console.log(error);
          }
        );
    }
  }

  getCanciones() {
    this.cancionesService.getCancionesPorUsuario(this.usuario.id).subscribe(
      (data) => {
        this.playlist = data;
      },
      (error) => {
        this.toastr.error(
          'Ha ocurrido un error inesperado al cargar las canciones.',
          '¡Error!',
          this.toastConfig
        );
        console.log(error);
        this.playlist = [];
      }
    );
  }

  selectCancionToAction(cancion: any) {
    this.cancionSelectedToAction = cancion;
    this.formUpdate.patchValue(cancion);
  }
}
