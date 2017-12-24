import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos: any = [];
  @ViewChild('tabela') grid;

  constructor(
    private lancamentoService: LancamentoService,
    private toastyService: ToastyService
  ) {}

  ngOnInit() {
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(lancamento) {
    this.lancamentoService.excluir(lancamento.id)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toastyService.success('Lançamento excluido com sucesso!');
      })
      .catch(error => console.log(error));
  }
}
