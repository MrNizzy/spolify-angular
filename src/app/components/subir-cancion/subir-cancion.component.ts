import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { CancionesService } from 'src/app/services/canciones.service';

@Component({
  selector: 'app-subir-cancion',
  templateUrl: './subir-cancion.component.html',
  styleUrls: ['./subir-cancion.component.scss'],
})
export class SubirCancionComponent {
  constructor(
    private cancionesService: CancionesService,
    private jwtHelper: JwtHelperService,
    private toastr: ToastrService
  ) {}

  file: any;
  usuario: any;

  ngOnInit() {
    this.usuario = this.onDecodeToken();
  }

  toastConfig: Partial<IndividualConfig> = {
    progressAnimation: 'decreasing',
    extendedTimeOut: 2000,
  };

  getFile($event: any) {
    this.file = $event.target.files[0];
  }

  sendFile() {
    const body = new FormData();
    body.append('file', this.file);
    this.cancionesService.sendFile(body, this.usuario.id).subscribe(
      (res) => {
        this.toastr.success(
          'Canción cargada con éxito.',
          '¡Éxito!',
          this.toastConfig
        );
      },
      (error) => {
        this.toastr.error(
          'Ha ocurrido un error inesperado al cargar la canción.',
          '¡Error!',
          this.toastConfig
        );
      }
    );
  }

  onDecodeToken() {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken;
    }
  }
}
