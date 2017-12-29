import { Endereco } from './endereco';

export class Pessoa {
  id: number;
  nome: string;
  ativo = true;
  endereco = new Endereco();
}
