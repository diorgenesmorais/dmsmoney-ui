import { Component, OnInit } from '@angular/core';

import { ToastyService } from 'ng2-toasty';

import { PessoasService, PessoaFiltro } from '../pessoas.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent implements OnInit {

  pessoas = [];
  filtro = new PessoaFiltro();

  constructor(
    private pessoasService: PessoasService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle('Pesquisar pessoa');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoasService.pesquisar(this.filtro)
      .then(resp => {
        this.filtro.totalElements = resp.total;
        this.pessoas = resp.pessoas;
      });
  }

  excluir(id: number, tabela: any) {
    this.pessoasService.excluir(id)
       .then(() => {
          if (tabela.first === 0) {
            this.pesquisar();
          } else {
            tabela.first = 0;
          }

          this.toasty.success('Excluido pessoa com sucesso!');
       })
       .catch(erro => this.errorHandler.handle(erro));
  }

}
