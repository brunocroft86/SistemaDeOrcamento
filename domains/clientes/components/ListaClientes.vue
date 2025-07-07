<template>
  <v-container>
    <v-row class="align-center mb-4">
      <v-btn icon="mdi-arrow-left" variant="plain" @click="$router.push('/')" />
      <h2 class="ml-2">Clientes</h2>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="/clientes/novo">Adicionar</v-btn>
    </v-row>
    <v-list>
      <v-list-item
        v-for="c in clientes"
        :key="c.id"
        @click="abrir(c)"
        class="cursor-pointer"
      >
        <v-list-item-title>{{ c.nome }}</v-list-item-title>
        <v-list-item-subtitle>{{ c.telefones ? c.telefones.join(', ') : '' }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import ClienteMockService from '../services/ClienteMockService'
export default {
  data() {
    return { clientes: [] }
  },
  async mounted() {
    this.clientes = await ClienteMockService.listar()
  },
  methods: {
    abrir(c) {
      this.$router.push({ path: '/clientes/novo', query: { cliente: JSON.stringify(c) } })
    }
  }
}
</script>
