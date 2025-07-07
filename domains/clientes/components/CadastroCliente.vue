<template>
  <v-container>
    <v-row class="align-center mb-4">
      <v-btn icon="mdi-arrow-left" variant="plain" @click="$router.push('/clientes')" />
      <h2 class="ml-2">Cadastro de Cliente</h2>
    </v-row>
    <v-form>
      <v-text-field label="Nome" v-model="form.nome" />
      <v-text-field label="Sobrenome" v-model="form.sobrenome" />
      <v-text-field label="CPF" v-model="form.cpf" />
      <v-text-field label="Telefone" v-model="form.telefone" />
      <v-text-field label="Endereço" v-model="form.endereco" />
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      form: { nome: '', sobrenome: '', cpf: '', telefone: '', endereco: '' }
    }
  },
  mounted() {
    const q = this.$route.query.cliente
    if (q) {
      try {
        this.form = JSON.parse(q)
      } catch (e) {}
    }
  }
}
</script>
