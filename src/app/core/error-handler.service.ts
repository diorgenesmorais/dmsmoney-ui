import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandlerService {

  constructor(private toasty: ToastyService) { }

  handle(error: any) {
    let msg: string;

    if (typeof error === 'string') {
      msg = error;
    } else {
      msg = 'Erro ao processar serviço remoto.';
      console.log(error);
    }
    this.toasty.error(msg);
  }
}
