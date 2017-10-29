import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent {

  pessoas = [
    {nome: 'Diorgenes', cidade: 'Recife', estado: 'PE', ativo: true},
    {nome: 'Laudeci', cidade: 'São Paulo', estado: 'SP', ativo: false},
    {nome: 'Deyvison', cidade: 'Cuiabá', estado: 'MG', ativo: true},
    {nome: 'Junior', cidade: 'Curitiba', estado: 'PR', ativo: false}
  ];
}
