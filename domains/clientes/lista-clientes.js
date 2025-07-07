class ClienteAPIService {
  static async listar() {
    try {
      const resp = await fetch('/api/clientes');
      if (!resp.ok) return [];
      return await resp.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}

const { createApp } = Vue;
const { createVuetify } = Vuetify;

const vuetify = createVuetify();

createApp({
  data() {
    return { clientes: [] };
  },
  async mounted() {
    this.clientes = await ClienteAPIService.listar();
  },
  template: `
  <v-app>
    <v-main>
      <v-container>
        <v-row class="justify-space-between align-center">
          <h2>Clientes</h2>
          <v-btn color="primary" href="cadastro-cliente.html">Adicionar</v-btn>
        </v-row>
        <v-list>
          <v-list-item v-for="c in clientes" :key="c.id">
            <v-list-item-title>{{ c.nome }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-container>
    </v-main>
  </v-app>
  `
}).use(vuetify).mount('#app');
