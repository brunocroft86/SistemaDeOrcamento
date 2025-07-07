class Termo {
  constructor(nome, texto) {
    this.nome = capitalizar(nome || '').trim();
    this.texto = (texto || '').trim();
  }
}

window.Termo = Termo;
