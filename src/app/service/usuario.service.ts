import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //URL da API
  private url = 'http://localhost:8080/api/usuario';
  
  constructor(private http: HttpClient) { }

  //Selecionar todos os usuários
  public selecionar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url + '/');
  }

  //Cadastrar usuário
  public cadastrar(obj: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.url + '/', obj);
  }

  //Editar usuário
  public editar(obj: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.url + '/', obj);
  }

  //Remover usuário
  public remover(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id);
  }
}
