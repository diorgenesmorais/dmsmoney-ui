import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class CategoriasService {

  categoriaUrl = 'http://localhost:8080/categorias';

  constructor(private http: AuthHttp) { }

  listarTodas(): Promise<any> {
    return this.http.get(this.categoriaUrl)
            .toPromise()
            .then(response => response.json())
            .catch(e => {
              return Promise.reject(e);
            });
  }
}
