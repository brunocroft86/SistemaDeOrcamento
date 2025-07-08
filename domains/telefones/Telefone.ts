interface ITelefone {
  numero: string
  toString(): string
}

class Telefone implements ITelefone {
  numero: string

  constructor(numero: string = '') {
    const formatted = Telefone.format(numero)
    if (!formatted) {
      throw new Error('Telefone invalido')
    }
    this.numero = formatted
  }

  toString(): string {
    return this.numero
  }

  static format(num: string): string {
    let v: string = String(num || '').replace(/\D/g, '')
    if (v.length < 10) return ''
    v = v.slice(0, 11)
    v = v.replace(/^(\d{2})(\d)/g, '($1) $2')
    v = v.replace(/(\d{5})(\d)/, '$1-$2')
    return v
  }

  static formatInput(input: HTMLInputElement): void {
    input.value = Telefone.format(input.value)
  }
}

// Disponibiliza a classe no escopo global para scripts nao modulados
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(window as any).Telefone = Telefone
