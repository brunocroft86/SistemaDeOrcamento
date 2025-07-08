import { Orcamento, IOrcamentoItem } from './Orcamento'
// Funções para criação e edição de orçamentos

function adicionarItem(descricao: string = "", valor: string = ""): void {
  const container = document.getElementById('itens-orcamento') as HTMLElement
  const div = document.createElement('div');
  div.className = 'item-fields';
  div.innerHTML = `
    <input type="text" placeholder="Descrição" class="desc" value="${descricao.replace(/"/g,"&quot;")}" maxlength="50" required>
    <input type="text" placeholder="Valor (R$)" class="valor" value="${valor}" maxlength="15" required oninput="formatarCampoReal(this)">
    <button type="button" class="remove-item-btn" onclick="removerEsteItem(this)">&times;</button>
  `;
  container.appendChild(div)
  atualizarTotalItens()
}
function removerEsteItem(btn: HTMLButtonElement): void {
  btn.parentElement!.remove()
  atualizarTotalItens()
}
function formatarCampoReal(input: HTMLInputElement): void {
  let v = input.value.replace(/\D/g,'')
  if (v === "") { input.value = ""; atualizarTotalItens(); return; }
  v = (parseInt(v,10)/100).toFixed(2)+'';
  v = v.replace('.',',');
  v = v.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  input.value = 'R$ ' + v
  atualizarTotalItens()
}
function obterItensForm(): IOrcamentoItem[] {
  const container = document.getElementById('itens-orcamento') as HTMLElement
  const campos = container.querySelectorAll('.item-fields');
  let itens: IOrcamentoItem[] = [];
  for(const campo of campos) {
    let desc = capitalizar(campo.querySelector('.desc').value.trim());
    let valor = campo.querySelector('.valor').value.trim();
    if(!desc || !valor) continue;
    let valorNum = Number(valor.replace(/[^\d,]/g, '').replace(',','.'));
    itens.push({descricao: desc, valor: valorNum});
  }
  return itens;
}
function atualizarTotalItens(): void {
  const itens = obterItensForm();
  const total = itens.reduce((s, x) => s + x.valor, 0);
  document.getElementById('itens-lista-total')!.textContent = itens.length>0 ? "Total deste orçamento: " + formatarReal(total) : "";
}
function salvarOrcamento(): void {
  if(clientes.length === 0) { showAviso("Cadastre um cliente primeiro!","#ef4444"); return; }
  const idx = window.app ? window.app.clienteSelecionado : null;
  if(idx === null || idx === "" || idx < 0) {
    showAviso("Escolha o cliente da lista!","#ef4444");
    return;
  }
  const clienteObj = clientes[idx];
  let itens = obterItensForm();
  if (itens.length == 0) { showAviso("Adicione ao menos 1 item!","#ef4444"); return; }
  if (orcamentoEditando !== null) {
    orcamentos[orcamentoEditando] = new Orcamento(clienteObj, itens);
    showAviso("Orçamento atualizado!", "#10b981");
  } else {
    orcamentos.push(new Orcamento(clienteObj, itens));
    showAviso("Orçamento inserido!", "#10b981");
  }
  resetOrcamentoForm();
  showSection('lista-orcamento');
}
function resetOrcamentoForm(): void {
  (document.getElementById('itens-orcamento') as HTMLElement).innerHTML = "";
  (document.getElementById('itens-lista-total') as HTMLElement).textContent = "";
  orcamentoEditando = null;
  (document.getElementById('btn-inserir-editar') as HTMLElement).textContent = 'Inserir';
  (document.getElementById('orcamento-titulo') as HTMLElement).textContent = 'Novo orçamento';
  if (window.app) window.app.clienteSelecionado = null;
}
function editarOrcamento(idx: number): void {
  const orc = orcamentos[idx];
  showSection('cadastro-orcamento');
  if (window.app) {
    const index = clientes.findIndex(c => c.cpf === orc.cliente.cpf);
    window.app.clienteSelecionado = index >= 0 ? index : null;
  }
  const itensDiv = document.getElementById('itens-orcamento') as HTMLElement;
  itensDiv.innerHTML = '';
  orc.itens.forEach(it => adicionarItem(it.descricao, "R$ "+Number(it.valor).toLocaleString('pt-BR', {minimumFractionDigits:2})));
  atualizarTotalItens();
  orcamentoEditando = idx;
  (document.getElementById('btn-inserir-editar') as HTMLElement).textContent = 'Atualizar';
  (document.getElementById('orcamento-titulo') as HTMLElement).textContent = 'Editar orçamento';
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.app) {
    window.app.clientesOptions = clientes.map((c, i) => ({
      idx: i,
      label: `${c.nome} ${c.sobrenome} - ${c.cpf} - ${c.telefonesFormatados}`
    }));
  }
});
