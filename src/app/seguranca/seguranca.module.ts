import { Http, RequestOptions } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { MoneyHttp } from './money-http';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

export function authHttpServiceFactory(auth: AuthService , http: Http, options: RequestOptions) {
  const config = new AuthConfig({
    globalHeaders: [
      { 'Content-Type' : 'application/json' }
    ]
  });
  return new MoneyHttp(auth, config, http, options);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule
  ],
  declarations: [LoginFormComponent],
  providers: [
    { provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [AuthService, Http, RequestOptions] },
    AuthGuard
  ]
})
export class SegurancaModule { }
