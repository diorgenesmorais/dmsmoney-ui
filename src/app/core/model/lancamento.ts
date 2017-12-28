import { Categoria } from './categoria';
import { Pessoa } from './pessoa';

export class Lancamento {
  id: number;
  descricao: string;
  dataVencimento: Date;
  dataPagto: Date;
  valor: number;
  observacao: string;
  tipo = 'RECEITA';
  categoria = new Categoria();
  pessoa = new Pessoa();
}
