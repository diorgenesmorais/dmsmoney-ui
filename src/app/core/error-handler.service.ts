import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

@Injectable()
export class ErrorHandlerService {

  constructor(private toasty: ToastyService) { }

  handle(error: any) {
    let msg: string;

    if (typeof error === 'string') {
      msg = error;
    } else if (error instanceof Response && error.status >= 400 && error.status <= 499) {
      let errors;
      msg = 'Ocorreu um erro ao processar a sua solicitação';
      if (error.status === 403) {
        msg = 'Você não tem permissão para executar esta ação';
      }
      try {
        errors = error.json();
        msg = errors[0].userMessage;
      } catch (e) {}
    } else {
      msg = 'Erro ao processar serviço remoto.';
    }
    this.toasty.error(msg);
  }
}
