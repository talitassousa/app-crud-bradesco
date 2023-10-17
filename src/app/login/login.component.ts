import { CursoService } from './../curso/curso.service';
import { Curso } from './../models/curso';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from './../models/usuario';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario!: Usuario;

  message!: string;
  action!: string;

  email!: string;
  senha!: string;

  constructor(
    private LoginService: LoginService,
    private cursoService: CursoService,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  async loginEfetuado(message: string, action: string) {
    this.message = message;
    this.action = action;
    message = 'Login efetuado';
    this._snackBar.open(message, action, {
      duration: 1500,
      panelClass: 'snackbar-login-efetuado',
    });
  }

  async usuarioNaoEncontrado(message: string, action: string) {
    this.message = message;
    this.action = action;
    message = 'Usuário não encontrado';
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: 'snackbar-usuario-nao-encontrado',
    });
  }

  login(email: string, senha: string) {
    this.usuarioService.pesquisarPorEmailESenha(email, senha).subscribe({
      next: async (reponse) => {
        this.usuario = reponse;
        if (this.usuario != null) {
          this.loginEfetuado(this.message, this.action);
          setTimeout(() => {
            this.cursoService.usuario = this.usuario
            this.router.navigate(['/cursos']);
          }, 2000);
          return;
        } else {
          this.usuarioNaoEncontrado(this.message, this.action);
          setTimeout(() => {
            this.email = '';
            this.senha = '';
          }, 2000);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
