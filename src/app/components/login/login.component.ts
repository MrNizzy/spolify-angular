import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { loginInterface } from 'src/app/models/login.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.checkSession();
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  get loginEmail() {
    return this.loginForm.get('email') as FormControl;
  }
  get loginPassword() {
    return this.loginForm.get('password') as FormControl;
  }

  toastConfig: Partial<IndividualConfig> = {
    progressAnimation: 'decreasing',
    extendedTimeOut: 2000,
  };

  checkSession() {
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['']);
    }
  }

  onLogin(form: loginInterface) {
    if (!this.areAllFieldsFilled(form)) {
      this.toastr.error(
        'Por favor llene todos los campos requeridos.',
        '¡Error!',
        this.toastConfig
      );
      return;
    }

    this.auth.loginByEmail(form).subscribe(
      (data) => {
        if (data) {
          localStorage.setItem('access_token', data.token);
          this.toastr.success(
            'Has iniciado sesión correctamente.',
            '¡Éxito!',
            this.toastConfig
          );
          this.router.navigate(['/']);
        }
      },
      (error) => {
        if (error.errorStatus === 403 || error.errorStatus === 404) {
          this.toastr.error(
            error.message,
            '¡Error al iniciar sesión!',
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
