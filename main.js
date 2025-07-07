const { createApp } = Vue;
const { createVuetify } = Vuetify;

const vuetify = createVuetify();

createApp({
  methods: {
    open(section) {
      if (typeof showSection === 'function') {
        showSection(section);
      }
    }
  },
  template: `
  <v-app>
    <v-main>
      <div class="header">
        <div class="header-logo capitalize">Amigos Móveis Planejados</div>
        <div class="header-desc">Gestão fácil de clientes e orçamentos<br>Móveis sob medida com confiança.</div>
      </div>
      <v-container class="mt-4">
        <v-card>
          <v-card-title>Menu</v-card-title>
          <v-card-text>
            <v-btn block color="primary" class="mb-2" @click="open('cadastro-cliente')">Cadastro de cliente</v-btn>
            <v-btn block color="primary" class="mb-2" @click="open('cadastro-orcamento')">Novo orçamento</v-btn>
            <v-btn block color="primary" class="mb-2" @click="open('lista-orcamento')">Listar orçamentos</v-btn>
            <v-btn block color="primary" class="mb-2" @click="open('gerenciar-termo')">Termo do orçamento</v-btn>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
    <footer style="text-align:center;font-size:.96em;padding:15px 7px 11px 7px;color:#6c584c; background:#f9fafb;">
      Sistema desenvolvido por <b class="capitalize">João & Bruno</b>
    </footer>
  </v-app>
  `
}).use(vuetify).mount('#app');
