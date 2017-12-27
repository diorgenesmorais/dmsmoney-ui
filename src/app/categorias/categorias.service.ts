import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoriasService {

  categoriaUrl = 'http://localhost:8080/categorias';

  constructor(private http: Http) { }

  listarTodas(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AZG1zZWxldHJvbmljYS5jb206YWRtaW4=');

    return this.http.get(this.categoriaUrl, { headers })
            .toPromise()
            .then(response => response.json())
            .catch(e => {
              return Promise.reject(e);
            });
  }
}
