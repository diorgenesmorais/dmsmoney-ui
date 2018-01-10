import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { AuthHttp } from 'angular2-jwt';

import { AuthService } from './auth.service';

@Injectable()
export class LogoutService {

  tokenRevokeUrl: string;

  constructor(
    private http: AuthHttp,
    private auth: AuthService
  ) {
    this.tokenRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
  }

  // TODO
  logout() {
    return this.http.delete(this.tokenRevokeUrl, { withCredentials: true })
              .toPromise()
              .then(() => {
                this.auth.limparAccessToken();
              });
  }
}
