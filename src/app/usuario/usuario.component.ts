import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../models/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { async } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  usuario: Usuario = new Usuario();

  formulario!: FormGroup;

  message!: string;
  action!: string;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async msgUsuarioCadastrado(message: string, action: string) {
    this.message = message;
    this.action = action;
    message = 'Usuário Cadastrado';
    this._snackBar.open(message, action, {
      duration: 1500,
      panelClass: 'snackbar-ususario-cadastrado',
    });
  }

  async msgEmailJaCadastrado(message: string, action: string) {
    this.message = message;
    this.action = action;
    message = 'Email já Cadastrado';
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: 'snackbar-email-cadastrado',
    });
  }

  salvar(usuario: Usuario) {
    this.usuarioService.adicionarUsuario(usuario).subscribe({
      next: async (response) => {
        console.log(usuario);
        this.msgUsuarioCadastrado(this.message, this.action);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.log(err);
        if (err.error.message == 'Email já cadastrado!') {
          this.msgEmailJaCadastrado(this.message, this.action);
        }
      },
    });
  }
}
