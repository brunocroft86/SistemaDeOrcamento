class Cliente {
  constructor(nome, sobrenome, cpf, telefones = [], endereco) {
    this.nome = capitalizar(nome || '').trim();
    this.sobrenome = capitalizar(sobrenome || '').trim();
    this.cpf = Cliente.formatCPF(cpf || '');
    if (!Array.isArray(telefones)) telefones = [telefones];
    this.telefones = telefones
      .filter(t => t !== undefined && t !== null && String(t).trim() !== '')
      .map(t => new Telefone(t));
    this.endereco = capitalizar(endereco || '').trim();
    if (!this.nome || !this.sobrenome || !this.cpf || !this.endereco) {
      throw new Error('Todos os campos de cliente são obrigatórios');
    }
  }

  static formatCPF(cpf) {
    let value = String(cpf).replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return value;
  }


  get nomeCompleto() {
    return `${this.nome} ${this.sobrenome}`.trim();
  }

  get telefonesFormatados() {
    return this.telefones.map(t => t.toString()).join(', ');
  }

  get telefone() {
    return this.telefones[0] ? this.telefones[0].toString() : '';
  }
}

window.Cliente = Cliente;
