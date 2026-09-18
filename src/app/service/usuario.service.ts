import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioRequest } from '../model/UsuarioRequest';
import { UsuarioResponse } from '../model/UsuarioResponse';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //URL da API
  private url = 'http://localhost:8080/api/usuario';
  
  constructor(private http: HttpClient) { }

  //Selecionar todos os usuários
  public selecionar(): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(this.url + '/');
  }

  //Cadastrar usuário
  public cadastrar(obj: UsuarioRequest): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(this.url + '/', obj);
  }

  //Editar usuário
  public editar(obj: UsuarioRequest): Observable<UsuarioResponse> {
    return this.http.put<UsuarioResponse>(this.url + '/', obj);
  }

  //Remover usuário
  public remover(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id);
  }
}
