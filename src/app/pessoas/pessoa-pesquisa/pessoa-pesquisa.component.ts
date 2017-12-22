import { Component, OnInit } from '@angular/core';
import { PessoasService, PessoaFiltro } from '../pessoas.service';

@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent implements OnInit {

  pessoas = [];
  filtro = new PessoaFiltro();

  constructor(private pessoasService: PessoasService) {}

  ngOnInit() {
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoasService.pesquisar(this.filtro)
      .then(resp => {
        this.filtro.totalElements = resp.total;
        this.pessoas = resp.pessoas;
      });
  }
}
