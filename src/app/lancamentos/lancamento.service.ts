import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LancamentoService {

  url = 'http://localhost:8080/lancamentos';

  constructor(private http: Http) { }

  pesquisar(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AZG1zZWxldHJvbmljYS5jb206YWRtaW4=');

    return this.http.get(`${this.url}?resumo`, {headers})
      .toPromise()
      .then(response => response.json().content)
      .catch(error => {
        return Promise.reject(`Não foi possível pesquisar\n${error}`);
      });
  }
}
