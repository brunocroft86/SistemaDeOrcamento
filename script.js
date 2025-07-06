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

// Função de aviso elegante no topo
function showAviso(msg, cor = "#2563eb") {
  let aviso = document.getElementById("aviso-msg");
  if (!aviso) {
    aviso = document.createElement("div");
    aviso.id = "aviso-msg";
    aviso.style = "position:fixed;top:0;left:0;right:0;z-index:99;display:flex;align-items:center;justify-content:center;font-weight:500;font-size:1.08em;background:" + cor + ";color:#fff;padding:13px 7px;box-shadow:0 2px 10px #0001;transition:top .3s; border-radius:0 0 18px 18px;min-height:35px;letter-spacing:.02em;";
    document.body.prepend(aviso);
  }
  aviso.textContent = msg;
  aviso.style.background = cor;
  aviso.style.display = "flex";
  aviso.style.top = "0";
  setTimeout(() => {
    aviso.style.top = "-60px";
    setTimeout(()=>{aviso.style.display="none"},400);
  }, 2100);
}

let clientes, orcamentos;
try {
  clientes = JSON.parse(localStorage.getItem('clientes')) || [];
} catch (e) {
  clientes = [];
}
try {
  orcamentos = JSON.parse(localStorage.getItem('orcamentos')) || [];
} catch (e) {
  orcamentos = [];
}
let orcamentoEditando = null;

let oldShowSection = function () {};
if (typeof showSection === "function") oldShowSection = showSection;
showSection = function (id) {
  if (typeof oldShowSection === "function") oldShowSection(id);

  const pageMap = {
    'home': 'index.html',
    'cadastro-cliente': 'cadastro-cliente.html',
    'cadastro-orcamento': 'novo-orcamento.html',
    'lista-orcamento': 'lista-orcamento.html'
  };

  const el = document.getElementById(id);
  if (!el) {
    if (pageMap[id]) window.location.href = pageMap[id];
    return;
  }

  ['home','cadastro-cliente','cadastro-orcamento','lista-orcamento'].forEach(sec => {
    const s = document.getElementById(sec);
    if (s) s.style.display = 'none';
  });
  el.style.display = 'block';

  if (id === 'cadastro-cliente') {
    fecharClienteDetalhe();
    atualizarListaClientes();
    setTimeout(() => {
      let busca = document.getElementById('buscaCliente');
      if (busca) busca.focus();
    }, 200);
  }
  if (id === 'cadastro-orcamento') {
    document.getElementById('cliente-orcamento-busca').value = '';
    document.getElementById('cliente-orcamento-indice').value = '';
    document.getElementById('sugestoes-clientes').innerHTML = '';
    if (clientes.length === 1) {
      const unico = clientes[0];
      document.getElementById('cliente-orcamento-busca').value = `${unico.nome} ${unico.sobrenome} - ${unico.cpf} - ${unico.telefone}`;
      document.getElementById('cliente-orcamento-indice').value = 0;
    }
    if (document.getElementById('itens-orcamento').children.length === 0) adicionarItem();
    setTimeout(() => {
      let busca = document.getElementById('cliente-orcamento-busca');
      if (busca) busca.focus();
    }, 200);
    filtrarSugestoesCliente();
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
