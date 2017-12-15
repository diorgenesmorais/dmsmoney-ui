import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { FormsModule } from '@angular/forms';
import { PessoaPesquisaComponent } from './pessoa-pesquisa/pessoa-pesquisa.component';
import { PessoaGridComponent } from './pessoa-grid/pessoa-grid.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/components/button/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    InputMaskModule,
    DataTableModule,
    TooltipModule,
    ButtonModule
  ],
  declarations: [
    PessoaCadastroComponent,
    PessoaGridComponent,
    PessoaPesquisaComponent
  ],
  exports: [
    PessoaCadastroComponent,
    PessoaPesquisaComponent
  ]
})
export class PessoasModule { }
