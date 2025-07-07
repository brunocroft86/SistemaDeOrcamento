let temas = [];
try {
  temas = JSON.parse(localStorage.getItem('temas')) || [];
} catch (e) {
  temas = [];
}
let temaEditando = null;

function salvarTema() {
  const nome = capitalizar(document.getElementById('tema-nome').value);
  const cor = document.getElementById('tema-cor').value;
  if (!nome) return;
  if (temaEditando !== null) {
    temas[temaEditando] = { nome, cor };
    temaEditando = null;
  } else {
    temas.push({ nome, cor });
  }
  localStorage.setItem('temas', JSON.stringify(temas));
  atualizarListaTemas();
  document.getElementById('tema-nome').value = '';
}

function editarTema(idx) {
  const t = temas[idx];
  document.getElementById('tema-nome').value = t.nome;
  document.getElementById('tema-cor').value = t.cor;
  temaEditando = idx;
}

function excluirTema(idx) {
  if (!confirm('Excluir este tema?')) return;
  temas.splice(idx, 1);
  localStorage.setItem('temas', JSON.stringify(temas));
  atualizarListaTemas();
}

function aplicarTema(idx) {
  localStorage.setItem('temaAtual', JSON.stringify(temas[idx]));
  alert('Tema aplicado!');
}

function atualizarListaTemas() {
  const ul = document.getElementById('lista-temas');
  ul.innerHTML = temas.map((t, i) =>
    `<li class="tema-item">
       <span style="background:${t.cor};color:#fff;padding:2px 6px;border-radius:4px">${t.nome}</span>
       <button onclick="editarTema(${i})">Editar</button>
       <button onclick="excluirTema(${i})">Excluir</button>
       <button onclick="aplicarTema(${i})">Aplicar</button>
     </li>`).join('');
}

document.addEventListener('DOMContentLoaded', atualizarListaTemas);
