// Lista de termos mantida apenas em memória
let termos = [];
let termoEditando = null;

function salvarTermo() {
  const nome = capitalizar(document.getElementById('termo-nome').value);
  const texto = document.getElementById('termo-texto').value.trim();
  if (!nome || !texto) return;
  if (termoEditando !== null) {
    termos[termoEditando] = { nome, texto };
    termoEditando = null;
  } else {
    termos.push({ nome, texto });
  }
  atualizarListaTermos();
  document.getElementById('termo-nome').value = '';
  document.getElementById('termo-texto').value = '';
}

function editarTermo(idx) {
  const t = termos[idx];
  document.getElementById('termo-nome').value = t.nome;
  document.getElementById('termo-texto').value = t.texto;
  termoEditando = idx;
}

function excluirTermo(idx) {
  if (!confirm('Excluir este termo?')) return;
  termos.splice(idx, 1);
  atualizarListaTermos();
}

function aplicarTermo(idx) {
  termoAtual = termos[idx];
  alert('Termo aplicado!');
}

function atualizarListaTermos() {
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
