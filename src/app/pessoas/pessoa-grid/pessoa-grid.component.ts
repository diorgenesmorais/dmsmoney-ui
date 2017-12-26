import { Component, Input, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/api';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

import { PessoaPesquisaComponent } from './../pessoa-pesquisa/pessoa-pesquisa.component';

@Component({
  selector: 'app-pessoa-grid',
  templateUrl: './pessoa-grid.component.html',
  styleUrls: ['./pessoa-grid.component.css']
})
export class PessoaGridComponent {

@Input() peoples = [];
@Input() filtro = {};
@ViewChild('tabela') tabela;

constructor(
  private pesquisa: PessoaPesquisaComponent,
  private confirmation: ConfirmationService
) {}

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisa.pesquisar(pagina);
  }

  confirmarExclusao(pessoa) {
    this.confirmation.confirm({
      message: `Deseja excluir ${pessoa.nome}?`,
      accept: () => {
        this.pesquisa.excluir(pessoa.id, this.tabela);
      }
    });
  }
}
