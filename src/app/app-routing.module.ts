import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LancamentosRoutingModule } from './lancamentos/lancamentos-routing.module';
import { PessoasRoutingModule } from './pessoas/pessoas-routing.module';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { SegurancaRoutingModule } from './seguranca/seguranca-routing.module';
import { NaoAutorizadoComponent } from './core/nao-autorizado.component';

const routes: Routes = [
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LancamentosRoutingModule,
    PessoasRoutingModule,
    SegurancaRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
