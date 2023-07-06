import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';
import { BannerPerfilComponent } from './components/banner-perfil/banner-perfil.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { PlayerComponent } from './components/player/player.component';
import { SubirCancionComponent } from './components/subir-cancion/subir-cancion.component';
import { GenerosPlaylistComponent } from './components/generos-playlist/generos-playlist.component';
import { PlaylistGeneroComponent } from './components/playlist-genero/playlist-genero.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AuthComponent,
    LoginComponent,
    RegistrarseComponent,
    BannerPerfilComponent,
    PerfilComponent,
    PlaylistComponent,
    PlayerComponent,
    SubirCancionComponent,
    GenerosPlaylistComponent,
    PlaylistGeneroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token'),
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
