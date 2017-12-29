import { Endereco } from './endereco';

export class Pessoa {
  id: number;
  nome: string;
  ativo: boolean;
  endereco = new Endereco();
}
