export interface TermoData {
  nome: string
  texto: string
}

export class Termo implements TermoData {
  nome: string
  texto: string

  constructor(nome: string, texto: string) {
    this.nome = capitalizar(nome || '').trim()
    this.texto = (texto || '').trim()
  }
}

window.Termo = Termo;
