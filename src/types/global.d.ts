interface SnackbarState {
  msg: string
  color: string
  show: boolean
}

interface AppState {
  snackbar: SnackbarState
  section?: string
  clientesOptions?: { idx: number; label: string }[]
  clienteSelecionado?: number | null
}

interface Window {
  app?: AppState
}

interface ITelefone {
  numero: string
  toString(): string
}

declare class Telefone implements ITelefone {
  numero: string
  constructor(numero?: string)
  toString(): string
  static format(num: string): string
  static formatInput(input: HTMLInputElement): void
}

interface ClienteData {
  nome: string
  sobrenome: string
  cpf: string
  telefones: Telefone[]
  endereco: string
}

interface OrcamentoItem {
  descricao: string
  valor: number
}

interface OrcamentoData {
  cliente: ClienteData
  itens: OrcamentoItem[]
  total: number
}

interface TermoData {
  nome: string
  texto: string
}

declare let clientes: ClienteData[]
declare let orcamentos: OrcamentoData[]
declare let orcamentoEditando: OrcamentoData | null
declare let termoAtual: TermoData | null

declare class Cliente implements ClienteData {
  nome: string
  sobrenome: string
  cpf: string
  telefones: Telefone[]
  endereco: string
  constructor(
    nome: string,
    sobrenome: string,
    cpf: string,
    telefones?: (string | Telefone)[],
    endereco?: string
  )
  readonly nomeCompleto: string
  readonly telefonesFormatados: string
  readonly telefone: string
  static formatCPF(cpf: string): string
}

declare class Orcamento implements OrcamentoData {
  cliente: Cliente
  itens: OrcamentoItem[]
  constructor(cliente: Cliente, itens?: OrcamentoItem[])
  readonly total: number
  gerarRecibo(loja?: string): string
}

declare class Termo implements TermoData {
  nome: string
  texto: string
  constructor(nome: string, texto: string)
}

declare const Vue: typeof import('vue')
declare const Vuetify: typeof import('vuetify')
