import { Lancamento } from './../core/model/lancamento';
import { Injectable } from '@angular/core';
import { Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import * as moment from 'moment';
import { AuthHttp } from 'angular2-jwt';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  url = 'http://localhost:8080/lancamentos';

  constructor(private http: AuthHttp) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoDe) {
      params.set('dataVencimentoDe', moment(filtro.dataVencimentoDe).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoAte) {
      params.set('dataVencimentoAte', moment(filtro.dataVencimentoAte).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.url}?resumo`, {search: params})
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const lancamentos = responseJson.content;

        const resultado = {
          lancamentos,
          total: responseJson.totalElements
        };

        return resultado;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.url}/${id}`)
            .toPromise()
            .then(() => null)
            .catch(error => {
              return Promise.reject(error);
            });
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.post(this.url, JSON.stringify(lancamento))
            .toPromise()
            .then(response => response.json())
            .catch(erro => (Promise.reject(erro)));
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.put(`${this.url}/${lancamento.id}`, JSON.stringify(lancamento))
            .toPromise()
            .then(response => {
              const lancResponse = response.json() as Lancamento;
              this.converteStringParaDate([lancResponse]);
              return lancResponse;
            })
            .catch(erro => (Promise.reject(erro)));
  }

  buscarPorId(id: number): Promise<Lancamento> {
    return this.http.get(`${this.url}/${id}`)
            .toPromise()
            .then(response => {
              const lancamento = response.json() as Lancamento;
              this.converteStringParaDate([lancamento]);
              return lancamento;
            })
            .catch(erro => (Promise.reject(erro)));
  }

  converteStringParaDate(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();

      if (lancamento.dataPagto) {
        lancamento.dataPagto = moment(lancamento.dataPagto, 'YYYY-MM-DD').toDate();
      }
    }
  }
}
