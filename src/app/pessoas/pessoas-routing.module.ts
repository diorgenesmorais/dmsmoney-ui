import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaPesquisaComponent } from './pessoa-pesquisa/pessoa-pesquisa.component';

const routes: Routes = [
  { path: 'pessoas', component: PessoaPesquisaComponent },
  { path: 'pessoas/novo', component: PessoaCadastroComponent },
  { path: 'pessoas/:id', component: PessoaCadastroComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PessoasRoutingModule { }
