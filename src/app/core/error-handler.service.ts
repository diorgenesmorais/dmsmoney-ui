import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

@Injectable()
export class ErrorHandlerService {

  constructor(private toasty: ToastyService) { }

  handle(error: any) {
    let msg: string;

    if (error instanceof Response && error.status >= 400 && error.status <= 499) {
      let errors;
      msg = 'Ocorreu um erro ao processar a sua solicitação';
      try {
        errors = error.json();
        msg = errors[0].userMessage;
      } catch (e) {
        console.log('Não foi possível obter o Json');
      }
    } else {
      msg = 'Erro ao processar serviço remoto.';
      console.log('', error);
    }
    this.toasty.error(msg);
  }
}
