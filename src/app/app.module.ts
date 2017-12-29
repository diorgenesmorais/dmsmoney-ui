import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentoPesquisaComponent } from './lancamentos/lancamento-pesquisa/lancamento-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { PessoaPesquisaComponent } from './pessoas/pessoa-pesquisa/pessoa-pesquisa.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';

const routes: Routes = [
  { path: 'lancamentos', component: LancamentoPesquisaComponent },
  { path: 'lancamentos/novo', component: LancamentoCadastroComponent },
  { path: 'pessoas', component: PessoaPesquisaComponent },
  { path: 'pessoas/novo', component: PessoaCadastroComponent }
];

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot(routes),

    LancamentosModule,
    PessoasModule,

    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
