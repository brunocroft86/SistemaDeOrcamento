// Funções para listagem e ações sobre orçamentos
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
        <button class="btn-view" onclick="verOrcamento(${orc.idx})">Ver</button>
      </div>
    `;
    ul.appendChild(li);
  });
  document.getElementById('soma-total').textContent = "Soma total: " + formatarReal(soma);
}
function removerOrcamento(idx) {
  if(confirm("Tem certeza que deseja remover este orçamento?")) {
    orcamentos.splice(idx, 1);
    atualizarListaOrcamento();
    showAviso("Orçamento removido!", "#ef4444");
  }
}
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

function verOrcamento(idx) {
  window.location.href = `../../index.html?sec=orcamento-cliente&idx=${idx}`;
}

document.addEventListener('DOMContentLoaded', () => {
  atualizarListaOrcamento();
});
