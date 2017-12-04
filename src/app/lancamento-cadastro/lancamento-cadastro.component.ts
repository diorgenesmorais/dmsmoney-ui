import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  constructor() { }
    tipos = [
      {label: 'Receita', value: 'RECEITA'},
      {label: 'Despesa', value: 'DESPESA'}
    ];

    pt_BR: any;

    ngOnInit() {
        this.pt_BR = {
          firstDayOfWeek: 0,
          dayNames: [ "Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado" ],
          dayNamesShort: [ "dom","seg","ter","qua","qui","sex","sáb" ],
          dayNamesMin: [ "D","S","T","Q","Q","S","S" ],
          monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
          monthNamesShort: [ "Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez" ]
        };
    }

}
