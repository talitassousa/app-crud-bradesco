import { Usuario } from './usuario';

export class Curso {
  id!: number;
  curso!: string;
  descricao!: string;
  usuario = new Usuario();
}
