import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from '../models/curso'
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  url!: string;
  usuario = new Usuario();

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/v1/curso';
  }

  adicionarCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(`${this.url}`, curso);
  }

  editarCurso(id: number, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.url}/${id}`, curso);
  }

  pesquisarPorId(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.url}/${id}`);
  }

  pesquisarTodos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.url}`);
  }

  excluirCurso(id: number): Observable<Curso> {
    return this.http.delete<Curso>(`${this.url}/${id}`);
  }
}
