// Tipagens globais definidas em src/types/global.d.ts

function formatCPF(input: HTMLInputElement): void {
  let value: string = input.value.replace(/\D/g, "");
  if (value.length > 11) value = value.slice(0, 11);
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  input.value = value;
}
function formatTelefone(input: HTMLInputElement): void {
  if (typeof Telefone !== 'undefined') {
    Telefone.formatInput(input);
  } else {
    let v: string = input.value.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
    v = v.slice(0, 15);
    input.value = v;
  }
}
function capitalizar(str: string): string {
  return str
    .replace(/\b\w/g, (l: string) => l.toUpperCase())
    .replace(/\s+/g, ' ')
    .trim();
}

// Exibe aviso via v-snackbar
function showAviso(msg: string, cor = "#2563eb"): void {
  if (window.app) {
    window.app.snackbar.msg = msg;
    window.app.snackbar.color = cor;
    window.app.snackbar.show = true;
  } else {
    alert(msg);
  }
}

// Dados temporários em memória enquanto a API não estiver disponível
interface ClienteLista {
  nome: string
  sobrenome: string
  cpf: string
  telefonesFormatados: string
  endereco: string
}

interface OrcamentoSimples {
  cliente: ClienteLista & { nomeCompleto: string }
  itens: { descricao: string; valor: number }[]
  total: number
}

interface Termo {
  nome: string
  texto: string
}

let clientes: ClienteLista[] = [];
let orcamentos: OrcamentoSimples[] = [];
let orcamentoEditando: OrcamentoSimples | null = null;
let termoAtual: Termo | null = null; // usado para inserir texto adicional nos orçamentos

let oldShowSection: ((id: string) => void) | null = function () {};
if (typeof showSection === "function") oldShowSection = showSection;

showSection = function (id: string): void {
  if (typeof oldShowSection === "function") oldShowSection(id);

  if (window.app) window.app.section = id;


  if (id === 'cadastro-cliente') {
    fecharClienteDetalhe();
    atualizarListaClientes();
    if (document.getElementById('telefones-cliente').children.length === 0) adicionarTelefone();
    setTimeout(() => {
      const busca = document.getElementById('buscaCliente');
      if (busca) busca.focus();
    }, 200);
  }
  if (id === 'cadastro-orcamento') {
    if (window.app) {
      window.app.clientesOptions = clientes.map((c: ClienteLista, i: number) => ({
        idx: i,
        label: `${c.nome} ${c.sobrenome} - ${c.cpf} - ${c.telefonesFormatados}`
      }));
      window.app.clienteSelecionado = clientes.length === 1 ? 0 : null;
    }
    if (document.getElementById('itens-orcamento').children.length === 0) adicionarItem();
    setTimeout(() => {
      const campo = document.querySelector('#cliente-orcamento-autocomplete input');
      if (campo) campo.focus();
    }, 200);
  }
  if (id === 'lista-orcamento') {
    atualizarListaOrcamento();
    setTimeout(() => {
      let busca = document.getElementById('search');
      if (busca) busca.focus();
    }, 200);
  }
  if (id !== 'cadastro-orcamento') resetOrcamentoForm();
}

function formatarReal(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
