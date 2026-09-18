import { Pessoa } from './Pessoa';

export class UsuarioResponse {

  id: number = 0;
  login: string = "";
  ativo: boolean = true;
  pessoa: Pessoa | null = null;

}
