import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  url!: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/v1/usuario';
  }

  adicionarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}`, usuario);
  }

  editarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.url}/${id}`, usuario);
  }

  pesquisarPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

  pesquisarPorEmailESenha(email: string, senha: string): Observable<Usuario> {
    return this.http.get<Usuario>(
      `${this.url}/validaUser?email=${email}&senha=${senha}`
    );
  }

  pesquisarTodos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.url}`);
  }

  excluirUsuario(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.url}/${id}`);
  }
}
