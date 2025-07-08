import { Cliente } from '../clientes/Cliente'

export interface OrcamentoItem {
  descricao: string
  valor: number
}

export interface OrcamentoData {
  cliente: Cliente
  itens: OrcamentoItem[]
  readonly total: number
}

export class Orcamento implements OrcamentoData {
  cliente: Cliente
  itens: OrcamentoItem[]

  constructor(cliente: Cliente, itens: OrcamentoItem[] = []) {
    if (!(cliente instanceof Cliente)) {
      throw new Error('Cliente inválido')
    }
    this.cliente = cliente
    this.itens = itens.map(it => ({
      descricao: capitalizar(it.descricao || ''),
      valor: Number(it.valor) || 0
    }))
  }

  get total(): number {
    return this.itens.reduce((s, i) => s + i.valor, 0)
  }

  gerarRecibo(loja: string = 'AMIGOS MÓVEIS PLANEJADOS'): string {
    const data = new Date().toLocaleDateString('pt-BR')
    return `╦══════════════════════╥
        ${loja}
╚══════════════════════╝

Recibo Eletrônico - Orçamento

Cliente: ${this.cliente.nomeCompleto}
CPF: ${this.cliente.cpf}
Telefones: ${this.cliente.telefonesFormatados || ''}
Endereço: ${this.cliente.endereco}

Itens:
${this.itens.map(it => `• ${capitalizar(it.descricao).padEnd(22,' ')}  ${formatarReal(it.valor)}`).join('\n')}

─────────────────────────
TOTAL:        ${formatarReal(this.total)}
─────────────────────────

Data: ${data}
Agradecemos pela preferência!`;
  }
}

window.Orcamento = Orcamento;
