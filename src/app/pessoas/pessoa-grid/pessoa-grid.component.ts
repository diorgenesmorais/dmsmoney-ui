import { PessoaPesquisaComponent } from './../pessoa-pesquisa/pessoa-pesquisa.component';
import { Component, Input } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/api';

@Component({
  selector: 'app-pessoa-grid',
  templateUrl: './pessoa-grid.component.html',
  styleUrls: ['./pessoa-grid.component.css']
})
export class PessoaGridComponent {

@Input() peoples = [];
@Input() filtro = {};

constructor(private pesquisa: PessoaPesquisaComponent) {}

aoMudarPagina(event: LazyLoadEvent) {
  const pagina = event.first / event.rows;
  this.pesquisa.pesquisar(pagina);
}
}
