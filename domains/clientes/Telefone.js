class Telefone {
  constructor(numero = '') {
    const formatted = Telefone.format(numero);
    if (!formatted) {
      throw new Error('Telefone invalido');
    }
    this.numero = formatted;
  }

  toString() {
    return this.numero;
  }

  static format(num) {
    let v = String(num || '').replace(/\D/g, '');
    if (v.length < 10) return '';
    v = v.slice(0, 11);
    v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
    v = v.replace(/(\d{5})(\d)/, '$1-$2');
    return v;
  }

  static formatInput(input) {
    input.value = Telefone.format(input.value);
  }
}

window.Telefone = Telefone;
