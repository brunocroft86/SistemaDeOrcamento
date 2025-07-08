import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListaClientes from '../../domains/clientes/components/ListaClientes.vue'
import CadastroCliente from '../../domains/clientes/components/CadastroCliente.vue'
import ListaOrcamentos from '../../domains/orcamentos/components/ListaOrcamentos.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/clientes', component: ListaClientes },
  { path: '/clientes/novo', component: CadastroCliente },
  { path: '/orcamentos', component: ListaOrcamentos }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
