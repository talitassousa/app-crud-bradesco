import { Curso } from "./curso";

export class Usuario {
  id!: number;
  nome!: string;
  email!: string;
  cpf!: string;
  senha!: string;
  cursos = new Array<Curso>();
}
