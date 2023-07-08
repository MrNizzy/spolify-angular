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
  searchText: string = '';

  private currentTrackSubject = new Subject<currentTrackInterface>();
  private playlistSubject = new Subject<currentTrackInterface[]>();
  private stopSignalSource = new Subject<void>();
  private searchTextSubject = new Subject<string>();

  currentTrackObservable = this.currentTrackSubject.asObservable();
  playlistObservable = this.playlistSubject.asObservable();
  stopSignal = this.stopSignalSource.asObservable();
  searchTextObservable = this.searchTextSubject.asObservable();

  sendStopSignal() {
    this.stopSignalSource.next();
  }

  sendSearchText(searchText: string) {
    this.searchText = searchText;
    this.searchTextSubject.next(this.searchText);
  }

  sendCurrentTrack(currentTrack: currentTrackInterface) {
    this.currentTrack = currentTrack;
    this.currentTrackSubject.next(currentTrack);
  }

  sendPlaylist(
    playlist: currentTrackInterface[],
    cancion: currentTrackInterface
  ) {
    this.playlist = playlist;
    this.playlistSubject.next(playlist);
    this.currentTrackSubject.next(cancion);
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
  }

  clearData() {
    this.currentTrack = {
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
    this.playlist = [];
  }
}
