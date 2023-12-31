import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './pages/auth/auth.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { SubirCancionComponent } from './components/subir-cancion/subir-cancion.component';
import { GenerosPlaylistComponent } from './components/generos-playlist/generos-playlist.component';
import { PlaylistGeneroComponent } from './components/playlist-genero/playlist-genero.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: GenerosPlaylistComponent,
        pathMatch: 'full',
      },
      {
        path: 'current',
        component: PlaylistGeneroComponent,
        pathMatch: 'full',
      },
      { path: 'upload', component: SubirCancionComponent, pathMatch: 'full' },
      {
        path: 'perfil',
        component: PerfilComponent,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegistrarseComponent,
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
