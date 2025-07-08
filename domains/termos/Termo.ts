export interface ITermo {
  nome: string;
  texto: string;
}

export class Termo implements ITermo {
  nome: string;
  texto: string;

  constructor(nome: string, texto: string) {
    this.nome = capitalizar(nome || '').trim();
    this.texto = (texto || '').trim();
  }
}

