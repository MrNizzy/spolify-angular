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

  playlist: currentTrackInterface[] = [];

  private currentTrackSubject = new Subject<currentTrackInterface>();
  private playlistSubject = new Subject<currentTrackInterface[]>();

  currentTrackObservable = this.currentTrackSubject.asObservable();

  playlistObservable = this.playlistSubject.asObservable();

  sendCurrentTrack(currentTrack: currentTrackInterface) {
    this.currentTrack = currentTrack;
    this.currentTrackSubject.next(currentTrack);
  }

  sendPlaylist(playlist: currentTrackInterface[]) {
    this.playlist = playlist;
    this.currentTrack = playlist[0];
    this.currentTrackSubject.next(this.currentTrack);
  }

  getNextTrack() {
    const currentIndex = this.playlist.findIndex(
      (song) => song.id === this.currentTrack.id
    );
    const nextIndex = currentIndex + 1;
    if (nextIndex < this.playlist.length) {
      const nextTrack = this.playlist[nextIndex];
      this.currentTrack = nextTrack;
      this.currentTrackSubject.next(nextTrack);
    }
    console.log(this.currentTrack);
  }

  getPreviousTrack() {
    const currentIndex = this.playlist.findIndex(
      (song) => song.id === this.currentTrack.id
    );
    const previousIndex = currentIndex - 1;
    if (previousIndex >= 0) {
      const previousTrack = this.playlist[previousIndex];
      this.currentTrack = previousTrack;
      this.currentTrackSubject.next(previousTrack);
    }
    console.log(this.currentTrack);
  }
}
