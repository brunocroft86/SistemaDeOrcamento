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

declare class Telefone {
  numero: string
  constructor(numero?: string)
  toString(): string
  static format(num: string): string
  static formatInput(input: HTMLInputElement): void
}

declare const Vue: typeof import('vue')
declare const Vuetify: typeof import('vuetify')
