const { createApp } = Vue;
const { createVuetify } = Vuetify;

const vuetify = createVuetify();

createApp({
  data() {
    return {
      snackbar: { show: false, msg: '', color: 'primary' }
    };
  },
  mounted() {
    window.app = this;
  },
  template: `
  <v-app>
    <v-main>
      <div class="header">
        <div class="header-logo capitalize">Amigos Móveis Planejados</div>
        <div class="header-desc">Gestão fácil de clientes e orçamentos<br>Móveis sob medida com confiança.</div>
      </div>
      <div class="container">
        <div class="card">
          <h2>Cadastro de cliente</h2>
          <div id="cliente-detalhe" style="display:none;"></div>
          <div id="form-cadastro-cliente">
            <v-text-field label="Nome" id="nome" placeholder="Nome"></v-text-field>
            <v-text-field label="Sobrenome" id="sobrenome" placeholder="Sobrenome"></v-text-field>
            <v-text-field label="CPF" id="cpf" placeholder="CPF (somente números)" maxlength="14" oninput="formatCPF(event.target)"></v-text-field>
            <div id="telefones-cliente" class="tel-list"></div>
            <v-btn type="button" class="add-item-btn" onclick="adicionarTelefone()">Adicionar telefone</v-btn>
            <v-text-field label="Endereço" id="endereco" placeholder="Rua, Número, Bairro, Cidade"></v-text-field>
            <v-btn class="form-btn" onclick="salvarCliente()">Salvar</v-btn>
            <v-btn class="form-btn" style="background:#fbbf24;color:#1e293b" href="lista-clientes.html">Voltar</v-btn>
          </div>
        </div>
      </div>
      <v-snackbar
        v-model="snackbar.show"
        timeout="2100"
        :style="{ background: snackbar.color, color: '#fff' }"
      >
        {{ snackbar.msg }}
      </v-snackbar>
    </v-main>
  </v-app>
  `
}).use(vuetify).mount('#app');

// Adiciona campo inicial de telefone quando a página carrega
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('telefones-cliente').children.length === 0) {
      adicionarTelefone();
    }
  });
} else {
  if (document.getElementById('telefones-cliente').children.length === 0) {
    adicionarTelefone();
  }
}
