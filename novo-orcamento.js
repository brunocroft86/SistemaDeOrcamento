// Funções para criação e edição de orçamentos
function filtrarSugestoesCliente() {
  let busca = document.getElementById('cliente-orcamento-busca').value.toLowerCase().trim();
  let lista = clientes.map((c,i) => ({
    idx: i,
    label: `${c.nome} ${c.sobrenome} - ${c.cpf} - ${c.telefone}`
  }));
  if(busca.length > 0) {
    lista = lista.filter(c => c.label.toLowerCase().includes(busca));
  }
  let sugDiv = document.getElementById('sugestoes-clientes');
  sugDiv.innerHTML = "";
  if(lista.length === 0 && busca.length > 0) {
    let n = document.createElement("div");
    n.textContent = "Nenhum cliente encontrado.";
    n.style.color = "#aaa";
    sugDiv.appendChild(n);
    document.getElementById('cliente-orcamento-indice').value = "";
    return;
  }
  lista.slice(0,10).forEach(cli => {
    let d = document.createElement("div");
    d.textContent = cli.label;
    d.onclick = function(){
      document.getElementById('cliente-orcamento-busca').value = cli.label;
      document.getElementById('cliente-orcamento-indice').value = cli.idx;
      sugDiv.innerHTML = "";
    };
    sugDiv.appendChild(d);
  });
}

document.addEventListener('click', function(e){
  if(!e.target.closest('#cliente-orcamento-busca') && !e.target.closest('#sugestoes-clientes')) {
    document.getElementById('sugestoes-clientes').innerHTML = "";
  }
});

function adicionarItem(descricao = "", valor = "") {
  const container = document.getElementById('itens-orcamento');
  const div = document.createElement('div');
  div.className = 'item-fields';
  div.innerHTML = `
    <input type="text" placeholder="Descrição" class="desc" value="${descricao.replace(/"/g,"&quot;")}" maxlength="50" required>
    <input type="text" placeholder="Valor (R$)" class="valor" value="${valor}" maxlength="15" required oninput="formatarCampoReal(this)">
    <button type="button" class="remove-item-btn" onclick="removerEsteItem(this)">&times;</button>
  `;
  container.appendChild(div);
  atualizarTotalItens();
}
function removerEsteItem(btn) {
  btn.parentElement.remove();
  atualizarTotalItens();
}
function formatarCampoReal(input) {
  let v = input.value.replace(/\D/g,'');
  if (v === "") { input.value = ""; atualizarTotalItens(); return; }
  v = (parseInt(v,10)/100).toFixed(2)+'';
  v = v.replace('.',',');
  v = v.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  input.value = 'R$ ' + v;
  atualizarTotalItens();
}
function obterItensForm() {
  const container = document.getElementById('itens-orcamento');
  const campos = container.querySelectorAll('.item-fields');
  let itens = [];
  for(const campo of campos) {
    let desc = capitalizar(campo.querySelector('.desc').value.trim());
    let valor = campo.querySelector('.valor').value.trim();
    if(!desc || !valor) continue;
    let valorNum = Number(valor.replace(/[^\d,]/g, '').replace(',','.'));
    itens.push({descricao: desc, valor: valorNum});
  }
  return itens;
}
function atualizarTotalItens() {
  const itens = obterItensForm();
  const total = itens.reduce((s, x) => s + x.valor, 0);
  document.getElementById('itens-lista-total').textContent = itens.length>0 ? "Total deste orçamento: " + formatarReal(total) : "";
}
function salvarOrcamento() {
  if(clientes.length === 0) { showAviso("Cadastre um cliente primeiro!","#ef4444"); return; }
  const idx = document.getElementById('cliente-orcamento-indice').value;
  if(idx === "") { showAviso("Escolha o cliente da lista!","#ef4444"); return; }
  const clienteObj = clientes[idx];
  let itens = obterItensForm();
  if (itens.length == 0) { showAviso("Adicione ao menos 1 item!","#ef4444"); return; }
  let total = itens.reduce((sum, it) => sum + it.valor, 0);
  if (orcamentoEditando !== null) {
    orcamentos[orcamentoEditando] = {
      cliente: capitalizar(clienteObj.nome + " " + clienteObj.sobrenome),
      cpf: clienteObj.cpf,
      telefone: clienteObj.telefone,
      endereco: capitalizar(clienteObj.endereco),
      itens,
      total
    };
    showAviso("Orçamento atualizado!", "#10b981");
  } else {
    orcamentos.push({
      cliente: capitalizar(clienteObj.nome + " " + clienteObj.sobrenome),
      cpf: clienteObj.cpf,
      telefone: clienteObj.telefone,
      endereco: capitalizar(clienteObj.endereco),
      itens,
      total
    });
    showAviso("Orçamento inserido!", "#10b981");
  }
  localStorage.setItem('orcamentos', JSON.stringify(orcamentos));
  resetOrcamentoForm();
  showSection('lista-orcamento');
}
function resetOrcamentoForm() {
  document.getElementById('itens-orcamento').innerHTML = "";
  document.getElementById('itens-lista-total').textContent = "";
  orcamentoEditando = null;
  document.getElementById('btn-inserir-editar').textContent = 'Inserir';
  document.getElementById('orcamento-titulo').textContent = 'Novo orçamento';
}
function editarOrcamento(idx) {
  const orc = orcamentos[idx];
  showSection('cadastro-orcamento');
  document.getElementById('cliente-orcamento-busca').value = `${orc.cliente} - ${orc.cpf} - ${orc.telefone}`;
  let index = clientes.findIndex(c=>
    `${c.nome} ${c.sobrenome}`.toLowerCase() === orc.cliente.toLowerCase() && c.cpf === orc.cpf
  );
  document.getElementById('cliente-orcamento-indice').value = index >=0 ? index : "";
  document.getElementById('sugestoes-clientes').innerHTML = "";
  const itensDiv = document.getElementById('itens-orcamento');
  itensDiv.innerHTML = '';
  orc.itens.forEach(it => adicionarItem(it.descricao, "R$ "+Number(it.valor).toLocaleString('pt-BR', {minimumFractionDigits:2})));
  atualizarTotalItens();
  orcamentoEditando = idx;
  document.getElementById('btn-inserir-editar').textContent = 'Atualizar';
  document.getElementById('orcamento-titulo').textContent = 'Editar orçamento';
}

document.addEventListener('DOMContentLoaded', () => {
  let campo = document.getElementById('cliente-orcamento-busca');
  if (campo) {
    campo.addEventListener('touchend', function(){
      setTimeout(filtrarSugestoesCliente, 80);
    }, false);
    campo.addEventListener('focus', function(){
      setTimeout(filtrarSugestoesCliente, 80);
    }, false);
    campo.addEventListener('input', filtrarSugestoesCliente, false);
  }
});
