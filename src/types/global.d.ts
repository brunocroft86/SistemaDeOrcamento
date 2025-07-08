interface ISnackbarState {
  msg: string
  color: string
  show: boolean
}

interface IAppState {
  snackbar: ISnackbarState
  section?: string
  clientesOptions?: { idx: number; label: string }[]
  clienteSelecionado?: number | null
}

interface Window {
  app?: IAppState
}

import type { ITelefone, Telefone as TelefoneClass } from '../../domains/telefones/Telefone'
import type { Cliente, IClienteData } from '../../domains/clientes/Cliente'
import type { Orcamento, IOrcamentoData, IOrcamentoItem } from '../../domains/orcamentos/Orcamento'
import type { Termo, ITermoData } from '../../domains/termos/Termo'

declare const Telefone: typeof TelefoneClass

declare let clientes: Cliente[]
declare let orcamentos: Orcamento[]
declare let orcamentoEditando: Orcamento | null
declare let termoAtual: Termo | null

declare const Vue: typeof import('vue')
declare const Vuetify: typeof import('vuetify')
