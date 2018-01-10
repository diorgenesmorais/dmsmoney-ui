import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';
import { error } from 'util';

import { Pessoa } from '../core/model/pessoa';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
  totalElements = 0;
}

@Injectable()
export class PessoasService {

  pessoasUrl: string;

  constructor(
    private http: AuthHttp
  ) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
  }

  pesquisar(pessoa: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', pessoa.pagina.toString());
    params.set('size', pessoa.itensPorPagina.toString());

    if (pessoa.nome) {
      params.set('nome', pessoa.nome);
    }

    return this.http.get(this.pessoasUrl, { search: params })
            .toPromise()
            .then(response => {
              const responseJson = response.json();
              const pessoas = responseJson.content;

              const resultado = {
                pessoas,
                total: responseJson.totalElements
              };

              return resultado;
            });
  }

  /* Obtem o content */
  listarTodas(): Promise<any> {
    return this.http.get(this.pessoasUrl)
            .toPromise()
            .then(response => response.json().content)
            .catch(erro => {
              return Promise.reject(erro);
            });
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${id}`)
            .toPromise()
            .then(() => null)
            .catch(erro => {
              return Promise.reject(erro);
            });
  }

  alterarStatus(id: number, ativo: boolean): Promise<any> {
    return this.http.put(`${this.pessoasUrl}/${id}/ativo`, ativo)
            .toPromise()
            .then()
            .catch(error => {
              return Promise.reject(error);
            });
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa))
              .toPromise()
              .then(response => response.json())
              .catch(erro => (Promise.reject(erro)));
  }

  buscarPorId(id: number): Promise<Pessoa> {
    return this.http.get(`${this.pessoasUrl}/${id}`)
              .toPromise()
              .then(response => response.json() as Pessoa);
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put(`${this.pessoasUrl}/${pessoa.id}`, JSON.stringify(pessoa))
              .toPromise()
              .then(response => response.json() as Pessoa);
  }
}
