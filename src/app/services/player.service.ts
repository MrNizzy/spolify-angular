import { Injectable } from '@angular/core';
import { currentTrackInterface } from '../models/currentTrack.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
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

  private currentTrackSubject = new Subject<currentTrackInterface>();

  currentTrackObservable = this.currentTrackSubject.asObservable();

  sendCurrentTrack(currentTrack: currentTrackInterface) {
    this.currentTrack = currentTrack;
    this.currentTrackSubject.next(currentTrack);
    console.log(this.currentTrack);
  }
}
