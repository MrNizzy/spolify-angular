import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CancionesService {
  constructor(private http: HttpClient) {}

  getCanciones() {
    return this.http.get(environment.apiUrl + '/api/canciones');
  }

  getCancionesPorUsuario(id: number) {
    return this.http.get(environment.apiUrl + '/api/canciones/' + id);
  }

  getGeneros() {
    return this.http.get(environment.apiUrl + '/api/canciones/generos/all');
  }

  getCancionesByGenero(genero: string) {
    return this.http.post(environment.apiUrl + '/api/canciones/generos', {
      genero: genero,
    });
  }

  updateCancion(id: any, form: any) {
    if (id) {
      return this.http
        .patch(environment.apiUrl + '/api/canciones/update/' + id, form)
        .pipe(
          catchError(() => {
            return throwError(() => new HttpErrorResponse({ status: 409 }));
          })
        );
    }
    return throwError(() => 'Ha ocurrido un error al actualizar la canción');
  }

  deleteCancion(id: any) {
    return this.http
      .delete(environment.apiUrl + '/api/canciones/delete/' + id)
      .pipe(
        catchError(() => {
          return throwError(() => new HttpErrorResponse({ status: 409 }));
        })
      );
  }

  sendFile(body: FormData, id: number): Observable<any> {
    return this.http.post(
      environment.apiUrl + '/api/canciones/upload/' + id,
      body
    );
  }
}
