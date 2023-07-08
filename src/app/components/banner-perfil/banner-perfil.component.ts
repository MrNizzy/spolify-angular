import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { perfilInterface } from 'src/app/models/profile.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-banner-perfil',
  templateUrl: './banner-perfil.component.html',
  styleUrls: ['./banner-perfil.component.scss'],
})
export class BannerPerfilComponent {
  @Input() usuario: any;
  @Input() canciones: any;

  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private fb: FormBuilder
  ) {}

  toastConfig: Partial<IndividualConfig> = {
    progressAnimation: 'decreasing',
    extendedTimeOut: 2000,
  };

  formUpdate = this.fb.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  get formUpdateNombre() {
    return this.formUpdate.get('nombre') as FormControl;
  }

  get formUpdateApellido() {
    return this.formUpdate.get('apellido') as FormControl;
  }

  get formUpdateEmail() {
    return this.formUpdate.get('email') as FormControl;
  }

  get formUpdatePassword() {
    return this.formUpdate.get('password') as FormControl;
  }

  assignData() {
    let password = '';
    this.usuario.password = password;
    this.formUpdate.patchValue(this.usuario);
  }

  onUpdatePerfil(form: perfilInterface) {
    if (form.nombre) {
      this.auth.updatePerfil(this.usuario.id, form).subscribe(
        () => {
          this.toastr.info(
            `Tu cuenta con el nombre ${this.usuario.username} se ha actualizado correctamente`,
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
}
