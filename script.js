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

let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
let orcamentos = JSON.parse(localStorage.getItem('orcamentos')) || [];
let orcamentoEditando = null;

// Autocomplete cliente para orçamento
function filtrarSugestoesCliente() {
  let busca = document.getElementById('cliente-orcamento-busca').value.toLowerCase().trim();
  let lista = clientes.map((c,i) => ({
    idx: i, 
    label: `${c.nome} ${c.sobrenome} - ${c.cpf} - ${c.telefone}`
  }));
  // Filtra se houver busca
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

// Fechar sugestões ao clicar fora
document.addEventListener('click', function(e){
  if(!e.target.closest('#cliente-orcamento-busca') && !e.target.closest('#sugestoes-clientes')) {
    document.getElementById('sugestoes-clientes').innerHTML = "";
  }
});

function salvarCliente() {
  const nome = capitalizar(document.getElementById('nome').value.trim());
  const sobrenome = capitalizar(document.getElementById('sobrenome').value.trim());
  const cpf = document.getElementById('cpf').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const endereco = capitalizar(document.getElementById('endereco').value.trim());
  if(!nome || !sobrenome || !cpf || !telefone || !endereco) { showAviso("Preencha todos os campos!", "#ef4444"); return; }
  if (clientes.find(c => c.cpf === cpf)) { showAviso("CPF já cadastrado!", "#eab308"); return; }
  clientes.push({nome, sobrenome, cpf, telefone, endereco});
  localStorage.setItem('clientes', JSON.stringify(clientes));
  document.getElementById('nome').value = '';
  document.getElementById('sobrenome').value = '';
  document.getElementById('cpf').value = '';
  document.getElementById('telefone').value = '';
  document.getElementById('endereco').value = '';
  atualizarListaClientes();
  showAviso("Cliente cadastrado!", "#10b981");
}

function atualizarListaClientes() {
  const ul = document.getElementById('lista-clientes');
  const busca = document.getElementById('buscaCliente').value.trim().toLowerCase();
  let lista = clientes.map((c,i) => ({...c,idx:i}));
  if(busca.length > 0){
    lista = lista.filter(cli =>
      cli.nome.toLowerCase().includes(busca) ||
      cli.sobrenome.toLowerCase().includes(busca) ||
      cli.cpf.replace(/\D/g,'').includes(busca.replace(/\D/g,'')) ||
      (cli.telefone && cli.telefone.replace(/\D/g,'').includes(busca.replace(/\D/g,''))) ||
      (cli.endereco && cli.endereco.toLowerCase().includes(busca))
    );
  }
  ul.innerHTML = "";
  if(lista.length == 0){
    ul.innerHTML = "<li style='padding:6px;color:#888'>Nenhum cliente encontrado.</li>";
    return;
  }
  lista.forEach(cli => {
    const li = document.createElement('li');
    li.style = "background:#f9fafb; border-radius:10px; padding:8px 8px 7px 8px; margin-bottom:7px; display:flex; align-items:center; justify-content:space-between; cursor:pointer;";
    li.innerHTML = `
      <span onclick="abrirClienteDetalhe(${cli.idx})" class="capitalize" style="flex:1;">
        <b>${cli.nome} ${cli.sobrenome}</b>
        <span style="font-size:.96em;">(${cli.cpf})</span><br>
        <span style="font-size:.96em;color:#2563eb">${cli.telefone}</span>
        <span style="font-size:.93em;color:#777;display:block;" class="capitalize">${cli.endereco}</span>
      </span>
      <button onclick="event.stopPropagation(); excluirCliente(${cli.idx})" title="Excluir" style="background:#ef4444; color:#fff; border:none; border-radius:6px; padding:2px 11px; font-size:1em; margin-left:12px; cursor:pointer;">&#128465;</button>
    `;
    ul.appendChild(li);
  });
}

function abrirClienteDetalhe(idx) {
  const c = clientes[idx];
  let div = document.getElementById("cliente-detalhe");
  div.style.display = "block";
  div.innerHTML = `
    <div style="background:#fbbf24; color:#1e293b; border-radius:12px; padding:15px 12px 10px 12px; margin-bottom:18px;">
      <h3 style="margin:2px 0 9px 0; font-size:1.07em;">Cliente selecionado</h3>
      <div class="capitalize"><b>Nome:</b> ${c.nome}</div>
      <div class="capitalize"><b>Sobrenome:</b> ${c.sobrenome}</div>
      <div><b>CPF:</b> ${c.cpf}</div>
      <div><b>Telefone:</b> ${c.telefone}</div>
      <div class="capitalize"><b>Endereço:</b> ${c.endereco}</div>
      <button style="margin-top:13px; background:#1e40af;color:#fff;border:none;padding:8px 15px;border-radius:9px;font-weight:500;font-size:1em;cursor:pointer;" onclick="fecharClienteDetalhe()">Fechar</button>
    </div>
  `;
  document.getElementById("form-cadastro-cliente").style.display = "none";
}
function fecharClienteDetalhe() {
  document.getElementById("cliente-detalhe").style.display = "none";
  document.getElementById("form-cadastro-cliente").style.display = "block";
}

function excluirCliente(idx){
  if(confirm("Tem certeza que deseja excluir este cliente?")) {
    clientes.splice(idx,1);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    atualizarListaClientes();
    showAviso("Cliente removido!", "#ef4444");
  }
}

let oldShowSection = function() {};
if (typeof showSection === "function") oldShowSection = showSection;
showSection = function(id){
  if(typeof oldShowSection === "function") oldShowSection(id);
  document.getElementById('home').style.display = 'none';
  document.getElementById('cadastro-cliente').style.display = 'none';
  document.getElementById('cadastro-orcamento').style.display = 'none';
  document.getElementById('lista-orcamento').style.display = 'none';
  document.getElementById(id).style.display = 'block';
  // Focar pesquisa automaticamente em mobile
  if(id === 'cadastro-cliente'){ 
    fecharClienteDetalhe(); 
    atualizarListaClientes(); 
    setTimeout(()=>{ 
      let busca = document.getElementById('buscaCliente');
      if(busca) busca.focus();
    }, 200); 
  }
  if(id === 'cadastro-orcamento') {
    document.getElementById('cliente-orcamento-busca').value = "";
    document.getElementById('cliente-orcamento-indice').value = "";
    document.getElementById('sugestoes-clientes').innerHTML = "";
    if (clientes.length === 1) {
      const unico = clientes[0];
      document.getElementById('cliente-orcamento-busca').value = `${unico.nome} ${unico.sobrenome} - ${unico.cpf} - ${unico.telefone}`;
      document.getElementById('cliente-orcamento-indice').value = 0;
    }
    if(document.getElementById("itens-orcamento").children.length === 0) adicionarItem();
    setTimeout(()=>{ 
      let busca = document.getElementById('cliente-orcamento-busca');
      if(busca) busca.focus();
    }, 200); 
    filtrarSugestoesCliente();
  }
  if(id === 'lista-orcamento') {
    atualizarListaOrcamento();
    setTimeout(()=>{ 
      let busca = document.getElementById('search');
      if(busca) busca.focus();
    }, 200);
  }
  if(id !== 'cadastro-orcamento') resetOrcamentoForm();
}

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
function formatarReal(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
function atualizarListaOrcamento() {
  const ul = document.getElementById('orcamento-list');
  const search = document.getElementById('search').value.trim().toLowerCase();
  let filtrados = orcamentos.map((o, idx) => ({...o, idx}));
  if (search.length > 0) {
    filtrados = filtrados.filter(orc => 
      (orc.cliente && orc.cliente.toLowerCase().includes(search)) ||
      (orc.cpf && orc.cpf.replace(/\D/g,"").includes(search.replace(/\D/g,"")))
    );
  }
  ul.innerHTML = '';
  if(filtrados.length === 0) {
    ul.innerHTML = "<li class='orcamento-item'>Nenhum orçamento cadastrado.</li>";
    document.getElementById('soma-total').textContent = "";
    return;
  }
  let soma = 0;
  filtrados.forEach(orc => {
    soma += orc.total;
    const li = document.createElement('li');
    li.className = 'orcamento-item';
    li.innerHTML = `
      <b class="capitalize">${orc.cliente}</b> <br>
      CPF: <span style="font-size:.97em">${orc.cpf}</span><br>
      Tel: <span style="font-size:.97em">${orc.telefone || ''}</span><br>
      <span style="font-size:.96em;color:#777;" class="capitalize">${orc.endereco || ''}</span>
      <ul style="padding-left:17px;margin:4px 0 5px 0;">
        ${orc.itens.map(it=>`<li class="capitalize">${it.descricao} - <span>${formatarReal(it.valor)}</span></li>`).join("")}
      </ul>
      <b>Total: ${formatarReal(orc.total)}</b>
      <div class="orcamento-actions">
        <button class="btn-edit" onclick="editarOrcamento(${orc.idx})">Editar</button>
        <button class="btn-delete" onclick="removerOrcamento(${orc.idx})">Remover</button>
        <button class="btn-share" onclick="compartilharOrcamento(${orc.idx})">Compartilhar</button>
      </div>
    `;
    ul.appendChild(li);
  });
  document.getElementById('soma-total').textContent = "Soma total: " + formatarReal(soma);
}
function removerOrcamento(idx) {
  if(confirm("Tem certeza que deseja remover este orçamento?")) {
    orcamentos.splice(idx, 1);
    localStorage.setItem('orcamentos', JSON.stringify(orcamentos));
    atualizarListaOrcamento();
    showAviso("Orçamento removido!", "#ef4444");
  }
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

// COMPARTILHAR COMO NOTA ELETRÔNICA (com capitalização)
function compartilharOrcamento(idx) {
  const orc = orcamentos[idx];
  const loja = "AMIGOS MÓVEIS PLANEJADOS";
  const data = new Date().toLocaleDateString("pt-BR");
  let recibo = 
`╔════════════════════════╗
        ${loja}
╚════════════════════════╝

Recibo Eletrônico - Orçamento

Cliente: ${capitalizar(orc.cliente)}
CPF: ${orc.cpf}
Telefone: ${orc.telefone || ""}
Endereço: ${capitalizar(orc.endereco || "")}

Itens:
${orc.itens.map(it => 
  "• " + capitalizar(it.descricao).padEnd(22, " ") + "  " + formatarReal(it.valor)).join('\n')}

─────────────────────────────
TOTAL:        ${formatarReal(orc.total)}
─────────────────────────────

Data: ${data}
Agradecemos pela preferência!
`;

  if (navigator.share) {
    navigator.share({
      title: `Nota Eletrônica - ${loja}`,
      text: recibo
    }).catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(recibo).then(() => {
      showAviso("Nota eletrônica copiada!", "#10b981");
    }, () => {
      showAviso("Erro ao copiar. Tente manualmente.", "#ef4444");
    });
  } else {
    prompt("Copie a nota eletrônica:", recibo);
  }
}

function exportarCSV() {
  let csv = 'Cliente,CPF,Telefone,Endereço,Itens,Total\n';
  const search = document.getElementById('search').value.trim().toLowerCase();
  let filtrados = orcamentos;
  if (search.length > 0) {
    filtrados = orcamentos.filter(orc => 
      (orc.cliente && orc.cliente.toLowerCase().includes(search)) ||
      (orc.cpf && orc.cpf.replace(/\D/g,"").includes(search.replace(/\D/g,"")))
    );
  }
  filtrados.forEach(orc => {
    let itensStr = orc.itens.map(it=>`${capitalizar(it.descricao)}: ${formatarReal(it.valor)}`).join(' | ');
    let linha = `"${capitalizar(orc.cliente)}","${orc.cpf}","${orc.telefone}","${capitalizar(orc.endereco)}","${itensStr}","${formatarReal(orc.total)}"`;
    csv += linha + "\n";
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'orcamentos_amigos_moveis_planejados.csv';
  link.click();
  showAviso("Exportado com sucesso!", "#10b981");
}

document.addEventListener('DOMContentLoaded', ()=>{
  atualizarListaClientes();
  // Garante sugestões sempre no mobile (Android/iOS)
  let campo = document.getElementById('cliente-orcamento-busca');
  if (campo) {
    campo.addEventListener('touchend', function(){
      setTimeout(filtrarSugestoesCliente, 80); // Espera foco para teclado abrir
    }, false);
    campo.addEventListener('focus', function(){
      setTimeout(filtrarSugestoesCliente, 80);
    }, false);
    campo.addEventListener('input', filtrarSugestoesCliente, false);
  }
});
