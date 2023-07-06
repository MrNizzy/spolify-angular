import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  sendFile(body: FormData, id: number): Observable<any> {
    return this.http.post(
      environment.apiUrl + '/api/canciones/upload/' + id,
      body
    );
  }
}
