import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso';
import { CursoService } from '../curso.service';

@Component({
  selector: 'app-lista-curso',
  templateUrl: './lista-curso.component.html',
  styleUrls: ['./lista-curso.component.css'],
})
export class ListaCursoComponent implements OnInit {
  cursos: Curso[] = [];

  curso = new Curso();

  constructor(private service: CursoService) {}

  ngOnInit(): void {
    this.pesquisarTodosCursos();
  }

  pesquisarTodosCursos() {
    this.service.pesquisarTodos().subscribe({
      next: (response) => {
        this.cursos = [...response];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  excluirCurso(id: string) {
    this.service.excluirCurso(id).subscribe({
      next: (response) => {
        this.curso = { ...response };
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
