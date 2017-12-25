import { ErrorHandlerService } from './../../core/error-handler.service';
import { DecimalPipe } from '@angular/common';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
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
    private error: ErrorHandlerService,
    private toastyService: ToastyService,
    private confirmation: ConfirmationService,
    private decimalPipe: DecimalPipe
  ) {}

  ngOnInit() {
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
      })
      .catch(erro => this.error.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento) {
    const valorFormatado = this.decimalPipe.transform(lancamento.valor, '1.2-2');
    this.confirmation.confirm({
      message: `Excluir o lançamento: ${lancamento.descricao} com o valor de ${valorFormatado}`,
      accept: () => {
        this.excluir(lancamento);
      }
    });
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
      .catch(erro => this.error.handle(erro));
  }
}
