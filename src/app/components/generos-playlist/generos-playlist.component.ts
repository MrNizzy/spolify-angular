import { Component, OnInit } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { CancionesService } from 'src/app/services/canciones.service';

@Component({
  selector: 'app-generos-playlist',
  templateUrl: './generos-playlist.component.html',
  styleUrls: ['./generos-playlist.component.scss'],
})
export class GenerosPlaylistComponent implements OnInit {
  constructor(
    private cancionesService: CancionesService,
    private toastr: ToastrService
  ) {}

  generos: any;

  toastConfig: Partial<IndividualConfig> = {
    progressAnimation: 'decreasing',
    extendedTimeOut: 2000,
  };

  ngOnInit() {
    this.getGeneros();
  }

  getGeneros() {
    this.cancionesService.getGeneros().subscribe(
      (data) => {
        this.generos = data;
      },
      (error) => {
        this.toastr.error(
          'Ha ocurrido un error inesperado al cargar las canciones.',
          '¡Error!',
          this.toastConfig
        );
        console.log(error);
        this.generos = [];
      }
    );
  }
}
