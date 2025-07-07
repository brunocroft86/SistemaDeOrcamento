function formatCPF(input) {
  let value = input.value.replace(/\D/g, "");
  if (value.length > 11) value = value.slice(0, 11);
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  input.value = value;
}
function formatTelefone(input) {
  let v = input.value.replace(/\D/g, "");
  v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
  v = v.replace(/(\d{5})(\d)/, "$1-$2");
  v = v.slice(0, 15);
  input.value = v;
}
function capitalizar(str) {
  return str.replace(/\b\w/g, l => l.toUpperCase()).replace(/\s+/g, ' ').trim();
}

// Exibe aviso via v-snackbar
function showAviso(msg, cor = "#2563eb") {
  if (window.app) {
    window.app.snackbar.msg = msg;
    window.app.snackbar.color = cor;
    window.app.snackbar.show = true;
  } else {
    alert(msg);
  }
}

// Dados temporários em memória enquanto a API não estiver disponível
let clientes = [];
let orcamentos = [];
let orcamentoEditando = null;
let termoAtual = null; // usado para inserir texto adicional nos orçamentos

let oldShowSection = function () {};
if (typeof showSection === "function") oldShowSection = showSection;

showSection = function (id) {
  if (typeof oldShowSection === "function") oldShowSection(id);

  if (window.app) window.app.section = id;


  if (id === 'cadastro-cliente') {
    fecharClienteDetalhe();
    atualizarListaClientes();
    setTimeout(() => {
      const busca = document.getElementById('buscaCliente');
      if (busca) busca.focus();
    }, 200);
  }
  if (id === 'cadastro-orcamento') {
    if (window.app) {
      window.app.clientesOptions = clientes.map((c, i) => ({
        idx: i,
        label: `${c.nome} ${c.sobrenome} - ${c.cpf} - ${c.telefone}`
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

function formatarReal(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
