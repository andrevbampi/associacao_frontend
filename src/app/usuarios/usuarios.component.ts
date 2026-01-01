import { Component } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  //Objeto do tipo Usuario
  usuario = new Usuario();

  //Variável para a visibilidade dos botões
  btnCadastro: boolean = true;

  //Variável para a visibilidade da tabela
  tabela: boolean = true;

  //JSON de usuários
  usuarios: Usuario[] = [];

  //Construtor
  constructor(private service: UsuarioService) {}

  //Método de seleção
  selecionar(): void {
    this.service.selecionar().subscribe(retorno => this.usuarios = retorno);
  }

  //Método de cadastro
  cadastrar(): void {
    this.service.cadastrar(this.usuario).subscribe(retorno => {
      //Cadastrar o usuário no vetor
      this.usuarios.push(retorno);

      //Limpar o formulário
      this.usuario = new Usuario();

      //Mensagem
      alert('Usuário cadastrado com sucesso.');
    });
  }

  //Método de edição
  editar(): void {
    this.service.editar(this.usuario).subscribe(retorno => {
      //Limpar o formulário
      this.usuario = new Usuario();

      //Visibilidade dos botões
      this.btnCadastro = true;

      //Visibilidade da tabela
      this.tabela = true;

      //Mensagem
      alert('Usuário editado com sucesso.');
    });
  }

  //Método para remover usuário
  remover(): void {
    this.service.remover(this.usuario.id).subscribe(retorno => {
      //Obter posição do vetor onde está o usuário
      let posicao = this.usuarios.findIndex(obj => {return obj.id == this.usuario.id});

      //Remover usuário do vetor
      this.usuarios.splice(posicao, 1);

      //Limpar o formulário
      this.usuario = new Usuario();

      //Visibilidade dos botões
      this.btnCadastro = true;

      //Visibilidade da tabela
      this.tabela = true;

      //Mensagem
      alert('Usuário removido com sucesso.');
    });
  }

  //Método para selecionar um usuário específico
  selecionarUsuario(posicao: number): void {
    //Selecionar usuário no vetor
    this.usuario = this.usuarios[posicao];

    //Visibilidade dos botões
    this.btnCadastro = false;

    //Visibilidade da tabela
    this.tabela = false;
  }

  //Método para cancelar
  cancelar(): void {
    //Limpar o formulário
    this.usuario = new Usuario();

    //Visibilidade dos botões
    this.btnCadastro = true;

    //Visibilidade da tabela
    this.tabela = true;

    //Carregar novamente
    this.selecionar();
  }

  //Método de inicialização
  ngOnInit() {
    this.selecionar();
  }
}
