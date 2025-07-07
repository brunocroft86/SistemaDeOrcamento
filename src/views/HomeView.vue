<template>
  <v-app>
    <v-main>
      <div class="header">
        <div class="header-logo capitalize">Amigos Móveis Planejados</div>
        <div class="header-desc">Gestão fácil de clientes e orçamentos<br>Móveis sob medida com confiança.</div>
      </div>
      <div class="container">
        <div class="card">
          <h2>Menu</h2>
          <div class="menu">
            <v-btn block color="primary" class="mb-2" to="/clientes">Clientes</v-btn>
            <v-btn block color="primary" class="mb-2" to="/orcamentos">Orçamentos</v-btn>
          </div>
        </div>
      </div>
    </v-main>
    <footer style="text-align:center;font-size:.96em;padding:15px 7px 11px 7px;color:#6c584c; background:#f9fafb;">
      Sistema desenvolvido por <b class="capitalize">João & Bruno</b>
    </footer>
  </v-app>
</template>
<script lang="ts">
export default {}
</script>
