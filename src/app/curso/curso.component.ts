import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from '../models/curso';
import { Usuario } from '../models/usuario';
import { UsuarioService } from './../usuario/usuario.service';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
})
export class CursoComponent implements OnInit {
  usuario = new Usuario();
  cursos: Curso[] = [];

  message!: string;
  action!: string;

  constructor(
    private cursoService: CursoService,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.usuario = cursoService.usuario;
    console.log(this.usuario);
  }

  ngOnInit(): void {
    this.pesquisarTodosCursos();
  }

  async matriculaEfetuada(message: string, action: string) {
    this.message = message;
    this.action = action;
    message = 'Matricula Efetuada!';
    this._snackBar.open(message, action, {
      duration: 1500,
      panelClass: 'snackbar-matricula-efetuada',
    });
  }

  async cursoMatriculado(message: string, action: string) {
    this.message = message;
    this.action = action;
    message = 'Curso já Cadastrado!';
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: 'snackbar-curso-matriculado',
    });
  }

  salvarEditar(id: string, curso: Curso) {
    if (this.route.snapshot.paramMap.get('id')) {
      this.editar(id, curso);
    } else {
      this.salvar(curso);
    }
  }

  salvar(curso: Curso) {
    this.cursoService.adicionarCurso(curso).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editar(id: string, curso: Curso) {
    this.cursoService.editarCurso(id, curso).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
        alert('Erro ao tentar editar!');
      },
    });
  }

  pesquisarTodosCursos() {
    this.cursoService.pesquisarTodos().subscribe({
      next: (response) => {
        this.cursos = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  matricula(curso: Curso) {
    this.adicionaCursoAoUsuario(curso);

    this.usuarioService.editarUsuario(this.usuario.id, this.usuario).subscribe({
      next: (response) => {
        this.usuario = response;
        console.log(this.usuario);
      },
      error: (err) => {
        console.log(err);
        this.cursoMatriculado(this.message, this.action);
      },
      complete: () => {
        this.matriculaEfetuada(this.message, this.action);
      },
    });
    this.excluirCursoDaMemoria();
  }

  adicionaCursoAoUsuario(curso: Curso) {
    this.usuario.cursos.push(curso);
  }

  excluirCursoDaMemoria() {
    this.usuario.cursos.pop();
  }
}
