import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from '../models/curso';
import { Usuario } from '../models/usuario';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
})
export class CursoComponent implements OnInit {
  usuario = new Usuario();
  cursos: Curso[] = [];

  constructor(
    private cursoService: CursoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.usuario = cursoService.usuario;
    console.log(this.usuario);
  }

  ngOnInit(): void {
    this.pesquisarTodosCursos();
  }

  salvarEditar(id: number, curso: Curso) {
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

  editar(id: number, curso: Curso) {
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

  matricula() {}
}
