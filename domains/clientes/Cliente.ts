export interface ITelefone {
  numero: string;
  toString(): string;
}

export class Telefone implements ITelefone {
  numero: string;

  constructor(numero: string = '') {
    const formatted = Telefone.format(numero);
    if (!formatted) {
      throw new Error('Telefone invalido');
    }
    this.numero = formatted;
  }

  toString(): string {
    return this.numero;
  }

  static format(num: string): string {
    let v: string = String(num || '').replace(/\D/g, '');
    if (v.length < 10) return '';
    v = v.slice(0, 11);
    v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
    v = v.replace(/(\d{5})(\d)/, '$1-$2');
    return v;
  }

  static formatInput(input: HTMLInputElement): void {
    input.value = Telefone.format(input.value);
  }
}

export interface ICliente {
  nome: string;
  sobrenome: string;
  cpf: string;
  telefones: Telefone[];
  endereco: string;
  readonly nomeCompleto: string;
  readonly telefonesFormatados: string;
  readonly telefone: string;
}

export class Cliente implements ICliente {
  nome: string;
  sobrenome: string;
  cpf: string;
  telefones: Telefone[];
  endereco: string;

  constructor(
    nome: string,
    sobrenome: string,
    cpf: string,
    telefones: Array<string | Telefone> = [],
    endereco: string
  ) {
    this.nome = capitalizar(nome || '').trim();
    this.sobrenome = capitalizar(sobrenome || '').trim();
    this.cpf = Cliente.formatCPF(cpf || '');
    if (!Array.isArray(telefones)) telefones = [telefones];
    this.telefones = telefones
      .filter(t => t !== undefined && t !== null && String(t).trim() !== '')
      .map(t => (t instanceof Telefone ? t : new Telefone(String(t))));
    this.endereco = capitalizar(endereco || '').trim();
    if (!this.nome || !this.sobrenome || !this.cpf || !this.endereco) {
      throw new Error('Todos os campos de cliente são obrigatórios');
    }
  }

  static formatCPF(cpf: string): string {
    let value: string = String(cpf).replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return value;
  }

  get nomeCompleto(): string {
    return `${this.nome} ${this.sobrenome}`.trim();
  }

  get telefonesFormatados(): string {
    return this.telefones.map(t => t.toString()).join(', ');
  }

  get telefone(): string {
    return this.telefones[0] ? this.telefones[0].toString() : '';
  }
}
