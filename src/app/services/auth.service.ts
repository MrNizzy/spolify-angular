import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { loginInterface } from '../models/login.interface';
import { environment } from 'src/environments/environment';
import { sessionInterface } from '../models/session.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  checkSession() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['/']);
    }
  }

  getUsuarioPorId(id: number) {
    return this.http.get(environment.apiUrl + '/api/usuarios/' + id);
  }

  getSecurePassword() {
    return this.http.get('http://93.188.163.184:8000/api/passwords/generate');
  }

  loginByEmail(form: loginInterface): Observable<sessionInterface> {
    return this.http
      .post<sessionInterface>(environment.apiUrl + '/api/auth/login', form)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorStatus = error.status;
          const errorMessage = error.error.message;

          const errorObject = {
            errorStatus,
            message: errorMessage,
          };

          return throwError(() => errorObject);
        })
      );
  }

  registerUser(form: any) {
    return this.http.post(environment.apiUrl + '/api/auth/register', form).pipe(
      catchError((error) => {
        return throwError(() => new HttpErrorResponse({ status: 409 }));
      })
    );
  }

  updatePerfil(id: any, form: any) {
    if (id) {
      return this.http
        .patch(environment.apiUrl + '/api/usuarios/update/' + id, form)
        .pipe(
          catchError(() => {
            return throwError(() => new HttpErrorResponse({ status: 409 }));
          })
        );
    }
    return throwError(() => 'Ha ocurrido un error al actualizar el perfil');
  }

  onLogOut() {
    localStorage.clear();
  }
}
