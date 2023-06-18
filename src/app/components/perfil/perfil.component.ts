import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CancionesService } from 'src/app/services/canciones.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent {
  canciones: any = [];
  usuario: any;
  datosUsuario: any = [];

  toastConfig: Partial<IndividualConfig> = {
    progressAnimation: 'decreasing',
    extendedTimeOut: 2000,
  };

  constructor(
    private auth: AuthService,
    private cancionesService: CancionesService,
    private toastr: ToastrService,
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit() {
    this.usuario = this.onDecodeToken();
    this.getCanciones();
    this.getUsuarioPorId();
  }

  onDecodeToken() {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken;
    }
  }

  getCanciones() {
    this.cancionesService.getCancionesPorUsuario(this.usuario.id).subscribe(
      (data) => {
        this.canciones = data;
      },
      (error) => {
        this.toastr.error(
          'Ha ocurrido un error inesperado al cargar las canciones.',
          '¡Error!',
          this.toastConfig
        );
        console.log(error);
        this.canciones = [];
      }
    );
  }

  getUsuarioPorId() {
    this.auth.getUsuarioPorId(this.usuario.id).subscribe(
      (data) => {
        this.datosUsuario = data;
      },
      (error) => {
        this.toastr.error(
          'Ha ocurrido un error inesperado al cargar los datos del usuario.',
          '¡Error!',
          this.toastConfig
        );
        console.log(error);
        this.datosUsuario = [];
      }
    );
  }
}
