<template>
  <v-container>
    <v-row class="justify-space-between align-center">
      <h2>Clientes</h2>
      <v-btn color="primary" to="/clientes/novo">Adicionar</v-btn>
    </v-row>
    <v-list>
      <v-list-item v-for="c in clientes" :key="c.id">
        <v-list-item-title>{{ c.nome }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import ClienteAPIService from '../services/ClienteAPIService'
export default {
  data() {
    return { clientes: [] }
  },
  async mounted() {
    this.clientes = await ClienteAPIService.listar()
  }
}
</script>
