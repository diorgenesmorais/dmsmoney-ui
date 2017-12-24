import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { LancamentoService } from './lancamentos/lancamento.service';
import { PessoasService } from './pessoas/pessoas.service';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';

import { ToastyModule } from 'ng2-toasty';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,

    LancamentosModule,
    PessoasModule,

    CoreModule,

    ToastyModule.forRoot()
  ],
  providers: [LancamentoService, PessoasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
