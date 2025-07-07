function obterParametro(nome) {
  const url = new URL(window.location.href);
  return url.searchParams.get(nome);
}

function exibirOrcamento() {
  const idx = obterParametro('idx');
  if (idx === null) {
    document.getElementById('orcamento-dados').textContent = 'Orçamento não encontrado.';
    return;
  }
  const orc = orcamentos[idx];
  if (!orc) {
    document.getElementById('orcamento-dados').textContent = 'Orçamento não encontrado.';
    return;
  }
  const div = document.getElementById('orcamento-dados');
  div.innerHTML = `
    <b class="capitalize">${orc.cliente}</b><br>
    CPF: <span style="font-size:.97em">${orc.cpf}</span><br>
    Tel: <span style="font-size:.97em">${orc.telefone || ''}</span><br>
    <span style="font-size:.96em;color:#777;" class="capitalize">${orc.endereco || ''}</span>
    <ul style="padding-left:17px;margin:4px 0 5px 0;">
      ${orc.itens.map(it=>`<li class="capitalize">${it.descricao} - <span>${formatarReal(it.valor)}</span></li>`).join('')}
    </ul>
    <b>Total: ${formatarReal(orc.total)}</b>
  `;
}

document.addEventListener('DOMContentLoaded', exibirOrcamento);
