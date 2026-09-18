import { Pessoa } from './Pessoa';

//classe de modelo
export class Usuario {

    //Atributos
    id: number = 0;
    login: string = "";
    senha: string = "";
    idPessoa: number = 0;
    pessoa: Pessoa | null = null;
}
