import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss'],
})
export class RegistrarseComponent {
  registerForm = this.fb.group({
    username: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    apellido: [''],
    fecha_nacimiento: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    repeatPassword: ['', [Validators.required]],
  });

  getRegisterControl(controlName: string): FormControl {
    return this.registerForm.get(controlName) as FormControl;
  }

  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  toastConfig: Partial<IndividualConfig> = {
    progressAnimation: 'decreasing',
    extendedTimeOut: 2000,
  };

  ngOnInit(): void {
    this.checkSession();
  }

  checkSession() {
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['']);
    }
  }

  onRegister(form: any) {
    const formValue = { ...form };

    // Eliminar el campo repeatPassword
    delete formValue.repeatPassword;

    if (!this.areAllFieldsFilled(formValue)) {
      this.toastr.error(
        'Por favor llene todos los campos requeridos correctamente.',
        '¡Error!',
        this.toastConfig
      );
      return;
    }

    if (form.password !== form.repeatPassword) {
      this.toastr.error(
        'Las contraseñas no coinciden.',
        '¡Error!',
        this.toastConfig
      );
      return;
    }

    this.auth.registerUser(formValue).subscribe(
      (data) => {
        this.toastr.success(
          'La cuenta se creó correctamente.',
          '¡Éxito!',
          this.toastConfig
        );
        this.router.navigate(['/auth/login']);
      },
      (error) => {
        if (error.errorStatus === 403 || error.errorStatus === 404) {
          this.toastr.error(
            error.message,
            '¡Error al crear la cuenta!',
            this.toastConfig
          );
        } else {
          this.toastr.error(
            'Ha ocurrido un error con el servidor.',
            '¡Error con el servidor!',
            this.toastConfig
          );
        }
      }
    );
  }

  areAllFieldsFilled(formValue: any): boolean {
    for (const key in formValue) {
      if (formValue.hasOwnProperty(key)) {
        const value = formValue[key];
        if (value === null || value === undefined || value === '') {
          return false;
        }
      }
    }
    return true;
  }
}
