import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { error } from 'util';
import { Pessoa } from '../core/model/pessoa';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 2;
  totalElements = 0;
}

@Injectable()
export class PessoasService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(
    private http: Http
  ) { }

  pesquisar(pessoa: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AZG1zZWxldHJvbmljYS5jb206YWRtaW4=');

    params.set('page', pessoa.pagina.toString());
    params.set('size', pessoa.itensPorPagina.toString());

    if (pessoa.nome) {
      params.set('nome', pessoa.nome);
    }

    return this.http.get(this.pessoasUrl, { headers: headers, search: params })
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
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AZG1zZWxldHJvbmljYS5jb206YWRtaW4=');
    return this.http.get(this.pessoasUrl, { headers })
            .toPromise()
            .then(response => response.json().content)
            .catch(erro => {
              return Promise.reject(erro);
            });
  }

  excluir(id: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AZG1zZWxldHJvbmljYS5jb206YWRtaW4=');

    return this.http.delete(`${this.pessoasUrl}/${id}`, { headers })
            .toPromise()
            .then(() => null)
            .catch(erro => {
              return Promise.reject(erro);
            });
  }

  alterarStatus(id: number, ativo: boolean): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AZG1zZWxldHJvbmljYS5jb206YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${id}/ativo`, ativo, { headers })
            .toPromise()
            .then()
            .catch(error => {
              return Promise.reject(error);
            });
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AZG1zZWxldHJvbmljYS5jb206YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa), { headers })
              .toPromise()
              .then(response => response.json())
              .catch(erro => (Promise.reject(erro)));
  }

  buscarPorId(id: number): Promise<Pessoa> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AZG1zZWxldHJvbmljYS5jb206YWRtaW4=');

    return this.http.get(`${this.pessoasUrl}/${id}`, { headers })
              .toPromise()
              .then(response => response.json() as Pessoa);
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AZG1zZWxldHJvbmljYS5jb206YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${pessoa.id}`, JSON.stringify(pessoa), { headers })
              .toPromise()
              .then(response => response.json() as Pessoa);
  }
}
