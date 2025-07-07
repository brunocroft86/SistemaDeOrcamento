// Funções de gerenciamento de clientes

function adicionarTelefone(valor = '') {
  const container = document.getElementById('telefones-cliente');
  const div = document.createElement('div');
  div.className = 'tel-field';
  div.innerHTML = `
    <input type="text" class="telefone" placeholder="(XX) XXXXX-XXXX" maxlength="15" oninput="formatTelefone(this)" value="${valor}">
    <button type="button" class="remove-tel-btn" onclick="removerEsteTelefone(this)">&times;</button>
  `;
  container.appendChild(div);
}

function removerEsteTelefone(btn) {
  btn.parentElement.remove();
}
function salvarCliente() {
  const nome = document.getElementById('nome').value.trim();
  const sobrenome = document.getElementById('sobrenome').value.trim();
  const cpf = document.getElementById('cpf').value.trim();
  const telefones = Array.from(document.querySelectorAll('#telefones-cliente .telefone'))
    .map(i => i.value.trim())
    .filter(v => v);
  const endereco = document.getElementById('endereco').value.trim();
  let novo;
  try {
    novo = new Cliente(nome, sobrenome, cpf, telefones, endereco);
  } catch (e) {
    showAviso(e.message || "Dados inválidos!", "#ef4444");
    return;
  }
  if (clientes.find(c => c.cpf === novo.cpf)) { showAviso("CPF já cadastrado!", "#eab308"); return; }
  clientes.push(novo);
  document.getElementById('nome').value = '';
  document.getElementById('sobrenome').value = '';
  document.getElementById('cpf').value = '';
  document.getElementById('telefones-cliente').innerHTML = '';
  adicionarTelefone();
  document.getElementById('endereco').value = '';
  atualizarListaClientes();
  showAviso("Cliente cadastrado!", "#10b981");
}

function atualizarListaClientes() {
  const ul = document.getElementById('lista-clientes');
  const busca = document.getElementById('buscaCliente').value.trim().toLowerCase();
  let lista = clientes.map((c,i) => ({...c, telefonesStr: c.telefonesFormatados, idx:i}));
  if(busca.length > 0){
    lista = lista.filter(cli =>
      cli.nome.toLowerCase().includes(busca) ||
      cli.sobrenome.toLowerCase().includes(busca) ||
      cli.cpf.replace(/\D/g,'').includes(busca.replace(/\D/g,'')) ||
      (cli.telefonesStr && cli.telefonesStr.replace(/\D/g,'').includes(busca.replace(/\D/g,''))) ||
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
        <span style="font-size:.96em;color:#2563eb">${cli.telefonesStr}</span>
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
      <div><b>Telefones:</b> ${c.telefonesFormatados}</div>
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
    atualizarListaClientes();
    showAviso("Cliente removido!", "#ef4444");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  atualizarListaClientes();
  if (document.getElementById('telefones-cliente')) adicionarTelefone();
});
