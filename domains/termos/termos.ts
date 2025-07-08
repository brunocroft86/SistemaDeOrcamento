// Lista de termos mantida apenas em memória
let termos: Termo[] = [];
let termoEditando: number | null = null;

function salvarTermo(): void {
  const nome = document.getElementById('termo-nome').value;
  const texto = document.getElementById('termo-texto').value;
  if (!nome.trim() || !texto.trim()) return;
  const termo = new Termo(nome, texto);
  if (termoEditando !== null) {
    termos[termoEditando] = termo;
    termoEditando = null;
  } else {
    termos.push(termo);
  }
  atualizarListaTermos();
  document.getElementById('termo-nome').value = '';
  document.getElementById('termo-texto').value = '';
}

function editarTermo(idx: number): void {
  const t = termos[idx];
  document.getElementById('termo-nome').value = t.nome;
  document.getElementById('termo-texto').value = t.texto;
  termoEditando = idx;
}

function excluirTermo(idx: number): void {
  if (!confirm('Excluir este termo?')) return;
  termos.splice(idx, 1);
  atualizarListaTermos();
}

function aplicarTermo(idx: number): void {
  termoAtual = termos[idx];
  alert('Termo aplicado!');
}

function atualizarListaTermos(): void {
  const ul = document.getElementById('lista-termos');
  ul.innerHTML = termos.map((t, i) =>
    `<li class="termo-item">`+
      `<span>${t.nome}</span>`+
      `<button onclick="editarTermo(${i})">Editar</button>`+
      `<button onclick="excluirTermo(${i})">Excluir</button>`+
      `<button onclick="aplicarTermo(${i})">Aplicar</button>`+
    `</li>`).join('');
}

document.addEventListener('DOMContentLoaded', atualizarListaTermos);
