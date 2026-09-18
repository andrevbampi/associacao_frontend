import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from '../model/Pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  //URL da API
  private url = 'http://localhost:8080/api/pessoa';
  
  constructor(private http: HttpClient) { }

  //Selecionar todas as pessoas
  public selecionar(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.url + '/');
  }

  //Cadastrar pessoa
  public cadastrar(obj: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.url + '/', obj);
  }

  //Editar pessoa
  public editar(obj: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(this.url + '/', obj);
  }

  //Remover pessoa
  public remover(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id);
  }
}
