import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoasComponent } from './pessoas/pessoas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { path: 'pessoas', component: PessoasComponent },
  { path: 'usuarios', component: UsuariosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
