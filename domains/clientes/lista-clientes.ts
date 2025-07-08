import type { IClienteData } from './Cliente'
import ClienteAPIService from './services/ClienteAPIService'

const { createApp } = Vue;
const { createVuetify } = Vuetify;

const vuetify = createVuetify();

createApp({
  data() {
    return { clientes: [] as IClienteData[] };
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
