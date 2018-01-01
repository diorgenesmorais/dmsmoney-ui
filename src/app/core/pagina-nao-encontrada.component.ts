import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pagina-nao-encontrada',
  template: `
    <div class="container">
      <div class="ui-g">
        <div class="ui-g-12">
          <h1 class="text-center">Página não encontrada</h1>
          <button pButton label="Voltar para página anterior" (click)="voltarParaPaginaAnterior()" ></button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class PaginaNaoEncontradaComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  voltarParaPaginaAnterior() {
    this.location.back();
  }
}
