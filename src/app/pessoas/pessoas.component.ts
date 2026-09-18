import { Component } from '@angular/core';
import { Pessoa } from '../model/Pessoa';
import { PessoaService } from '../service/pessoa.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent {

  //Objeto do tipo Pessoa
  pessoa = new Pessoa();

  //Variável para a visibilidade dos botões
  btnCadastro: boolean = true;

  //Variável para a visibilidade da tabela
  tabela: boolean = true;

  //JSON de pessoas
  pessoas: Pessoa[] = [];

  //Construtor
  constructor(private service: PessoaService) {}

  //Método de seleção
  selecionar(): void {
    this.service.selecionar().subscribe(retorno => this.pessoas = retorno);
  }

  //Método de cadastro
  cadastrar(): void {
    this.service.cadastrar(this.pessoa).subscribe(retorno => {
      //Cadastrar a pessoa no vetor
      this.pessoas.push(retorno);

      //Limpar o formulário
      this.pessoa = new Pessoa();

      //Mensagem
      alert('Pessoa cadastrada com sucesso.');
    }, errorResponse => {
      if (errorResponse.status === 500) {
        alert(errorResponse.error)
      }
    });
  }

  //Método de edição
  editar(): void {
    this.service.editar(this.pessoa).subscribe(retorno => {
      //Limpar o formulário
      this.pessoa = new Pessoa();

      //Visibilidade dos botões
      this.btnCadastro = true;

      //Visibilidade da tabela
      this.tabela = true;

      //Mensagem
      alert('Pessoa editada com sucesso.');
    }, errorResponse => {
      if (errorResponse.status === 500) {
        alert(errorResponse.error)
      }
    });
  }

  //Método para remover pessoa
  remover(): void {
    this.service.remover(this.pessoa.id).subscribe(retorno => {
      //Obter posição do vetor onde está a pessoa
      let posicao = this.pessoas.findIndex(obj => {return obj.id == this.pessoa.id});

      //Remover pessoa do vetor
      this.pessoas.splice(posicao, 1);

      //Limpar o formulário
      this.pessoa = new Pessoa();

      //Visibilidade dos botões
      this.btnCadastro = true;

      //Visibilidade da tabela
      this.tabela = true;

      //Mensagem
      alert('Pessoa removida com sucesso.');
    }, errorResponse => {
      if (errorResponse.status === 500) {
        alert(errorResponse.error)
      }
    });
  }

  //Método para selecionar uma pessoa específica
  selecionarPessoa(posicao: number): void {
    //Selecionar pessoa no vetor
    this.pessoa = this.pessoas[posicao];

    //Visibilidade dos botões
    this.btnCadastro = false;

    //Visibilidade da tabela
    this.tabela = false;
  }

  //Método para cancelar
  cancelar(): void {
    //Limpar o formulário
    this.pessoa = new Pessoa();

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

  descricaoTipo(tipo: number): string {
    switch (tipo) {
        case 1:
            return 'Física';
        case 2:
            return 'Jurídica';
        default:
            return tipo.toString();
    }
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
