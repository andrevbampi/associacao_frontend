import { Component } from '@angular/core';
import { UsuarioRequest } from '../model/UsuarioRequest';
import { UsuarioResponse } from '../model/UsuarioResponse';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  // Objeto utilizado pelo formulário
  usuario = new UsuarioRequest();

  // Variável para a visibilidade dos botões
  btnCadastro: boolean = true;

  // Variável para a visibilidade da tabela
  tabela: boolean = true;

  // Usuários retornados pela API
  usuarios: UsuarioResponse[] = [];

  // Construtor
  constructor(private service: UsuarioService) {}

  // Método de seleção
  selecionar(): void {
    this.service.selecionar().subscribe(retorno => {
      this.usuarios = retorno;
    });
  }

  // Método de cadastro
  cadastrar(): void {
    this.service.cadastrar(this.usuario).subscribe(retorno => {

      // Cadastrar o usuário no vetor
      this.usuarios.push(retorno);

      // Limpar o formulário
      this.usuario = new UsuarioRequest();

      // Mensagem
      alert('Usuário cadastrado com sucesso.');

    }, errorResponse => {

      if (errorResponse.status === 500) {
        alert(errorResponse.error);
      }

    });
  }

  // Método de edição
  editar(): void {
    this.service.editar(this.usuario).subscribe(retorno => {

      // Atualizar o usuário no vetor
      const posicao = this.usuarios.findIndex(
        obj => obj.id === retorno.id
      );

      if (posicao !== -1) {
        this.usuarios[posicao] = retorno;
      }

      // Limpar o formulário
      this.usuario = new UsuarioRequest();

      // Visibilidade dos botões
      this.btnCadastro = true;

      // Visibilidade da tabela
      this.tabela = true;

      // Mensagem
      alert('Usuário editado com sucesso.');

    }, errorResponse => {

      if (errorResponse.status === 500) {
        alert(errorResponse.error);
      }

    });
  }

  // Método para remover usuário
  remover(): void {
    this.service.remover(this.usuario.id).subscribe(retorno => {

      // Obter posição do vetor onde está o usuário
      let posicao = this.usuarios.findIndex(
        obj => obj.id === this.usuario.id
      );

      // Remover usuário do vetor
      this.usuarios.splice(posicao, 1);

      // Limpar o formulário
      this.usuario = new UsuarioRequest();

      // Visibilidade dos botões
      this.btnCadastro = true;

      // Visibilidade da tabela
      this.tabela = true;

      // Mensagem
      alert('Usuário removido com sucesso.');

    }, errorResponse => {

      if (errorResponse.status === 500) {
        alert(errorResponse.error);
      }

    });
  }

  // Método para selecionar um usuário específico
  selecionarUsuario(posicao: number): void {

    const usuarioResponse = this.usuarios[posicao];

    // Copiar dados do Response para o Request
    this.usuario.id = usuarioResponse.id;
    this.usuario.login = usuarioResponse.login;
    this.usuario.senha = "";

    if (usuarioResponse.pessoa !== null) {
      this.usuario.idPessoa = usuarioResponse.pessoa.id;
    }

    // Visibilidade dos botões
    this.btnCadastro = false;

    // Visibilidade da tabela
    this.tabela = false;
  }

  // Método para cancelar
  cancelar(): void {
    // Limpar o formulário
    this.usuario = new UsuarioRequest();

    // Visibilidade dos botões
    this.btnCadastro = true;

    // Visibilidade da tabela
    this.tabela = true;

    // Carregar novamente
    this.selecionar();
  }

  // Método de inicialização
  ngOnInit() {
    this.selecionar();
  }

  calcularIdade(dataNascimento: string): number {
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  }

}