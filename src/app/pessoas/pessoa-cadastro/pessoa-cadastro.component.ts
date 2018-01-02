import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Pessoa } from './../../core/model/pessoa';
import { PessoasService } from './../pessoas.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoasService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.atualizarTitulo();

    const id = this.route.snapshot.params['id'];

    if (!isNaN(id)) {
      this.carregarPessoa(id);
    }
  }

  get editando() {
    return Boolean(this.pessoa.id);
  }

  atualizarTitulo() {
    this.title.setTitle(this.editando ? `Editando pessoa: ${this.pessoa.nome}` : 'Cadastrar pessoa');
  }

  adicionarPessoa(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(response => {
        this.toasty.success('Adicionou a pessoa com sucesso');

        this.router.navigate(['/pessoas', response.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(response => {
        this.pessoa = response;
        this.toasty.success('Pessoa alterada com sucesso!');
        this.atualizarTitulo();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.pessoa.id) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  carregarPessoa(id: number) {
    this.pessoaService.buscarPorId(id)
      .then(response => {
        this.pessoa = response;
        this.atualizarTitulo();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/novo']);
  }
}
