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

// Exibe aviso via v-snackbar
function showAviso(msg, cor = "#2563eb") {
  if (window.app) {
    window.app.snackbar.msg = msg;
    window.app.snackbar.color = cor;
    window.app.snackbar.show = true;
  } else {
    alert(msg);
  }
}


function formatarReal(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
