const { createApp } = Vue;
const { createVuetify } = Vuetify;

const vuetify = createVuetify();

const app = createApp({
  data() {
    return { section: 'home' };
  },
  methods: {
    go(sec) { showSection(sec); }
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
        <div class="card" id="home" v-show="section === 'home'">
          <h2>Menu</h2>
          <div class="menu">
            <v-btn block color="primary" class="mb-2" @click="go('cadastro-cliente')">Cadastro de cliente</v-btn>
            <v-btn block color="primary" class="mb-2" @click="go('cadastro-orcamento')">Novo orçamento</v-btn>
            <v-btn block color="primary" class="mb-2" @click="go('lista-orcamento')">Listar orçamentos</v-btn>
            <v-btn block color="primary" class="mb-2" @click="go('gerenciar-termo')">Termo do orçamento</v-btn>
          </div>
        </div>

        <div class="card" id="cadastro-cliente" v-show="section === 'cadastro-cliente'">
          <h2>Cadastro de cliente</h2>
          <div id="cliente-detalhe" style="display:none;"></div>
          <div id="form-cadastro-cliente">
            <v-text-field label="Nome" id="nome" placeholder="Nome"></v-text-field>
            <v-text-field label="Sobrenome" id="sobrenome" placeholder="Sobrenome"></v-text-field>
            <v-text-field label="CPF" id="cpf" placeholder="CPF (somente números)" maxlength="14" oninput="formatCPF(event.target)"></v-text-field>
            <v-text-field label="Telefone" id="telefone" placeholder="(XX) XXXXX-XXXX" maxlength="15" oninput="formatTelefone(event.target)"></v-text-field>
            <v-text-field label="Endereço" id="endereco" placeholder="Rua, Número, Bairro, Cidade"></v-text-field>
            <v-btn class="form-btn" onclick="salvarCliente()">Salvar</v-btn>
            <hr>
            <v-text-field id="buscaCliente" class="search-box" placeholder="Buscar cliente (nome, cpf, tel, endereço)..." oninput="atualizarListaClientes()"></v-text-field>
            <ul id="lista-clientes" style="list-style:none; padding:0; margin:0;"></ul>
            <v-btn class="form-btn" style="background:#fbbf24;color:#1e293b" @click="go('home')">Voltar ao Menu</v-btn>
          </div>
        </div>

        <div class="card" id="cadastro-orcamento" v-show="section === 'cadastro-orcamento'">
          <h2 id="orcamento-titulo">Novo orçamento</h2>
          <v-text-field label="Cliente" id="cliente-orcamento-busca" placeholder="Pesquisar cliente por nome ou CPF..." autocomplete="off"></v-text-field>
          <div id="sugestoes-clientes" class="autocomplete-list"></div>
          <input type="hidden" id="cliente-orcamento-indice">
          <div class="itens-orcamento" id="itens-orcamento"></div>
          <div class="itens-lista-total" id="itens-lista-total"></div>
          <v-btn type="button" class="add-item-btn" onclick="adicionarItem()">Adicionar item</v-btn>
          <v-btn class="form-btn" id="btn-inserir-editar" onclick="salvarOrcamento()">Inserir</v-btn>
          <v-btn class="form-btn" style="background:#fbbf24;color:#1e293b" @click="go('home');resetOrcamentoForm()">Voltar ao Menu</v-btn>
        </div>

        <div class="card" id="lista-orcamento" v-show="section === 'lista-orcamento'">
          <h2>Orçamentos realizados</h2>
          <v-text-field class="search-box" id="search" placeholder="Pesquisar por nome ou CPF..." oninput="atualizarListaOrcamento()"></v-text-field>
          <div id="soma-total" class="total-soma"></div>
          <ul class="orcamento-list" id="orcamento-list"></ul>
          <v-btn class="form-btn" style="background:#fbbf24;color:#1e293b" @click="go('home')">Voltar ao Menu</v-btn>
        </div>

        <div class="card" id="orcamento-cliente" v-show="section === 'orcamento-cliente'">
          <h2>Orçamento do Cliente</h2>
          <div id="orcamento-dados"></div>
          <div id="orcamento-termo" style="margin-top:10px;font-size:.92em;color:#374151"></div>
          <v-btn class="form-btn" style="background:#fbbf24;color:#1e293b" onclick="window.history.back()">Voltar</v-btn>
        </div>

        <div class="card" id="gerenciar-termo" v-show="section === 'gerenciar-termo'">
          <h2>Gerenciar Termo</h2>
          <v-text-field label="Nome do termo" id="termo-nome" placeholder="Nome do termo"></v-text-field>
          <v-textarea label="Texto do termo" id="termo-texto" rows="4" placeholder="Texto do termo"></v-textarea>
          <v-btn class="form-btn" onclick="salvarTermo()">Salvar</v-btn>
          <ul id="lista-termos" style="list-style:none;padding:0;margin-top:10px;"></ul>
          <v-btn class="form-btn" style="background:#fbbf24;color:#1e293b" @click="go('home')">Voltar ao Menu</v-btn>
        </div>
      </div>
    </v-main>
    <footer style="text-align:center;font-size:.96em;padding:15px 7px 11px 7px;color:#6c584c; background:#f9fafb;">
      Sistema desenvolvido por <b class="capitalize">João & Bruno</b>
    </footer>
  </v-app>
  `
});

app.use(vuetify);
window.app = app.mount('#app');

const params = new URLSearchParams(window.location.search);
const hash = window.location.hash.replace('#', '');
const start = params.get('sec') || hash;
if (start) showSection(start);
