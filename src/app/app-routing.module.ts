import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './login/login.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CursoModule } from './curso/curso.module';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    loadChildren: () => LoginModule
  },
  {
    path: 'usuarios',
    loadChildren: () => UsuarioModule
  },
  {
    path: 'cursos',
    loadChildren: () => CursoModule
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
