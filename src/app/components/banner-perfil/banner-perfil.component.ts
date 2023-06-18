import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-banner-perfil',
  templateUrl: './banner-perfil.component.html',
  styleUrls: ['./banner-perfil.component.scss'],
})
export class BannerPerfilComponent {
  @Input() usuario: any;
  @Input() canciones: any;
}
