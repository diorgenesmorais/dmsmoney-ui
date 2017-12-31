import { ToastyService } from 'ng2-toasty';
import { LancamentoService } from './../lancamento.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PessoasService } from './../../pessoas/pessoas.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriasService } from './../../categorias/categorias.service';
import { Lancamento } from './../../core/model/lancamento';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  constructor(
    private categoriaService: CategoriasService,
    private errorHandler: ErrorHandlerService,
    private pessoaService: PessoasService,
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

    tipos = [
      {label: 'Receita', value: 'RECEITA'},
      {label: 'Despesa', value: 'DESPESA'}
    ];

    categorias = [];
    pessoas = [];
    lancamento = new Lancamento();
    pt_BR: any;

    get editando() {
      return Boolean(this.lancamento.id);
    }

    ngOnInit() {
      this.pt_BR = {
        firstDayOfWeek: 0,
        dayNames: [ "Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado" ],
        dayNamesShort: [ "dom","seg","ter","qua","qui","sex","sáb" ],
        dayNamesMin: [ "D","S","T","Q","Q","S","S" ],
        monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
        monthNamesShort: [ "Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez" ]
      };
      const id = this.route.snapshot.params['id'];

      if (id) {
        this.carregarLancamento(id);
      }
        this.carregarCategorias();
        this.carregarPessoas();

    }

    carregarCategorias() {
      this.categoriaService.listarTodas()
          .then(categorias => {
            this.categorias = categorias.map(c => ({ label: c.nome, value: c.id }));
          })
          .catch(e => this.errorHandler.handle(e));
    }

    carregarPessoas() {
      this.pessoaService.listarTodas()
        .then(pessoas => {
          this.pessoas = pessoas.map(p => ({ label: p.nome, value: p.id }));
        })
        .catch(e => this.errorHandler.handle(e));
    }

    adicionarLancamento(form: FormControl) {
      this.lancamentoService.adicionar(this.lancamento)
        .then(response => {
          this.toasty.success('Lançamento salvo com sucesso!');

          this.router.navigate(['/lancamentos', response.id]);
        }).catch(erro => this.errorHandler.handle(erro));
    }

    atualizarLancamento(form: FormControl) {
      this.lancamentoService.atualizar(this.lancamento)
        .then(response => {
          this.lancamento = response;
          this.toasty.success('Lançamento atualizado com sucesso!');
        })
        .catch(erro => this.errorHandler.handle(erro));
    }

    salvar(form: FormControl) {
      if (this.editando) {
        this.atualizarLancamento(form);
      } else {
        this.adicionarLancamento(form);
      }
    }

    carregarLancamento(id: number) {
      this.lancamentoService.buscarPorId(id)
        .then(lancamento => this.lancamento = lancamento)
        .catch(erro => this.errorHandler.handle(erro));
    }

    novo(form: FormControl) {
      form.reset();
      setTimeout(function() {
        this.Lancamento = new Lancamento();
      }.bind(this), 1);
      this.router.navigate(['/lancamentos/novo']);
    }
}
