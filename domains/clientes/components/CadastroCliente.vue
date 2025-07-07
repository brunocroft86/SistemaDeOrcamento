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

      <div v-for="(tel, i) in form.telefones" :key="i" class="d-flex mb-2">
        <v-text-field
          class="flex-grow-1"
          label="Telefone"
          v-model="form.telefones[i]"
        />
        <v-btn
          icon="mdi-delete"
          variant="plain"
          @click="removerTelefone(i)"
          v-if="form.telefones.length > 1"
        />
      </div>
      <v-btn variant="tonal" class="mb-4" @click="adicionarTelefone">
        Adicionar telefone
      </v-btn>

      <v-text-field label="Endereço" v-model="form.endereco" />
    </v-form>
  </v-container>
</template>

<script lang="ts">
export default {
  data() {
    return {
      form: { nome: '', sobrenome: '', cpf: '', telefones: [''], endereco: '' }
    }
  },
  mounted() {
    const q = this.$route.query.cliente
    if (q) {
      try {
        const dados = JSON.parse(q)
        if (Array.isArray(dados.telefones)) {
          this.form = { ...this.form, ...dados }
        } else if (dados.telefone) {
          this.form = { ...this.form, ...dados, telefones: [dados.telefone] }
        } else {
          this.form = { ...this.form, ...dados }
        }
      } catch (e) {}
    }
  },
  methods: {
    adicionarTelefone() {
      this.form.telefones.push('')
    },
    removerTelefone(idx) {
      if (this.form.telefones.length > 1) this.form.telefones.splice(idx, 1)
    }
  }
}
</script>
