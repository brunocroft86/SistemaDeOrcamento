const { createApp } = Vue;
const { createVuetify } = Vuetify;

const vuetify = createVuetify();

const app = createApp({
  data() {
    return {
      section: 'home',
      snackbar: { show: false, msg: '', color: 'primary' },
      clientes: [],
      clienteForm: { nome: '', sobrenome: '', cpf: '', telefone: '', endereco: '' },
      clienteBusca: '',
      clienteDetalheIdx: null,

      orcamentos: [],
      orcamentoForm: { clienteIdx: null, itens: [] },
      orcamentoEditando: null,
      orcamentoBusca: '',
      verOrcamentoIdx: null,

      termos: [],
      termoForm: { nome: '', texto: '' },
      termoEditando: null,
      termoAtual: null
    };
  },
  computed: {
    clientesOptions() {
      return this.clientes.map((c, i) => ({
        idx: i,
        label: `${c.nome} ${c.sobrenome} - ${c.cpf} - ${c.telefone}`
      }));
    },
    clientesFiltrados() {
      const busca = this.clienteBusca.trim().toLowerCase();
      if (!busca) return this.clientes;
      return this.clientes.filter(cli =>
        cli.nome.toLowerCase().includes(busca) ||
        cli.sobrenome.toLowerCase().includes(busca) ||
        cli.cpf.replace(/\D/g, '').includes(busca.replace(/\D/g, '')) ||
        (cli.telefone && cli.telefone.replace(/\D/g, '').includes(busca.replace(/\D/g, ''))) ||
        (cli.endereco && cli.endereco.toLowerCase().includes(busca))
      );
    },
    orcamentosFiltrados() {
      const search = this.orcamentoBusca.trim().toLowerCase();
      const lista = this.orcamentos.map((o, idx) => ({ ...o, idx }));
      if (!search) return lista;
      return lista.filter(orc =>
        (orc.cliente && orc.cliente.toLowerCase().includes(search)) ||
        (orc.cpf && orc.cpf.replace(/\D/g, '').includes(search.replace(/\D/g, '')))
      );
    },
    totalOrcamento() {
      return this.orcamentoForm.itens.reduce((s, it) => s + it.valor, 0);
    },
    orcamentoVisualizado() {
      return this.verOrcamentoIdx !== null ? this.orcamentos[this.verOrcamentoIdx] : null;
    }
  },
  methods: {
    go(sec) { this.section = sec; },
    formatCPF(evt) { formatCPF(evt.target); },
    formatTelefone(evt) { formatTelefone(evt.target); },
    adicionarItem() { this.orcamentoForm.itens.push({ descricao: '', valor: 0 }); },
    removerItem(i) { this.orcamentoForm.itens.splice(i, 1); },
    formatValor(idx, event) {
      let v = event.target.value.replace(/\D/g, '');
      if (v === '') {
        event.target.value = '';
        this.orcamentoForm.itens[idx].valor = 0;
        return;
      }
      v = (parseInt(v, 10) / 100).toFixed(2) + '';
      v = v.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      event.target.value = 'R$ ' + v;
      this.orcamentoForm.itens[idx].valor = parseFloat(v.replace(/\./g, '').replace(',', '.'));
    },
    salvarCliente() {
      const f = this.clienteForm;
      const nome = capitalizar(f.nome.trim());
      const sobrenome = capitalizar(f.sobrenome.trim());
      const cpf = f.cpf.trim();
      const telefone = f.telefone.trim();
      const endereco = capitalizar(f.endereco.trim());
      if (!nome || !sobrenome || !cpf || !telefone || !endereco) {
        showAviso('Preencha todos os campos!', '#ef4444');
        return;
      }
      if (this.clientes.find(c => c.cpf === cpf)) {
        showAviso('CPF já cadastrado!', '#eab308');
        return;
      }
      this.clientes.push({ nome, sobrenome, cpf, telefone, endereco });
      this.clienteForm = { nome: '', sobrenome: '', cpf: '', telefone: '', endereco: '' };
      showAviso('Cliente cadastrado!', '#10b981');
    },
    excluirCliente(idx) {
      if (confirm('Tem certeza que deseja excluir este cliente?')) {
        this.clientes.splice(idx, 1);
        showAviso('Cliente removido!', '#ef4444');
        if (this.clienteDetalheIdx === idx) this.fecharClienteDetalhe();
      }
    },
    abrirClienteDetalhe(idx) { this.clienteDetalheIdx = idx; },
    fecharClienteDetalhe() { this.clienteDetalheIdx = null; },
    salvarOrcamento() {
      if (this.clientes.length === 0) {
        showAviso('Cadastre um cliente primeiro!', '#ef4444');
        return;
      }
      const idx = this.orcamentoForm.clienteIdx;
      if (idx === null || idx === '' || idx < 0) {
        showAviso('Escolha o cliente da lista!', '#ef4444');
        return;
      }
      const clienteObj = this.clientes[idx];
      const itens = this.orcamentoForm.itens.filter(it => it.descricao && it.valor);
      if (itens.length === 0) {
        showAviso('Adicione ao menos 1 item!', '#ef4444');
        return;
      }
      const total = itens.reduce((s, x) => s + x.valor, 0);
      const dados = {
        cliente: capitalizar(clienteObj.nome + ' ' + clienteObj.sobrenome),
        cpf: clienteObj.cpf,
        telefone: clienteObj.telefone,
        endereco: capitalizar(clienteObj.endereco),
        itens,
        total
      };
      if (this.orcamentoEditando !== null) {
        this.orcamentos[this.orcamentoEditando] = dados;
        showAviso('Orçamento atualizado!', '#10b981');
      } else {
        this.orcamentos.push(dados);
        showAviso('Orçamento inserido!', '#10b981');
      }
      this.resetOrcamentoForm();
      this.go('lista-orcamento');
    },
    editarOrcamento(i) {
      const orc = this.orcamentos[i];
      this.orcamentoEditando = i;
      this.go('cadastro-orcamento');
      this.orcamentoForm.clienteIdx = this.clientes.findIndex(c =>
        (`${c.nome} ${c.sobrenome}`).toLowerCase() === orc.cliente.toLowerCase() && c.cpf === orc.cpf
      );
      this.orcamentoForm.itens = orc.itens.map(it => ({ descricao: it.descricao, valor: it.valor }));
    },
    resetOrcamentoForm() {
      this.orcamentoForm = { clienteIdx: null, itens: [] };
      this.orcamentoEditando = null;
    },
    removerOrcamento(i) {
      if (confirm('Tem certeza que deseja remover este orçamento?')) {
        this.orcamentos.splice(i, 1);
        showAviso('Orçamento removido!', '#ef4444');
      }
    },
    compartilharOrcamento(i) {
      const orc = this.orcamentos[i];
      const loja = 'AMIGOS MÓVEIS PLANEJADOS';
      const data = new Date().toLocaleDateString('pt-BR');
      let recibo =
`╔════════════════════════╗
        ${loja}
╚════════════════════════╝

Recibo Eletrônico - Orçamento

Cliente: ${capitalizar(orc.cliente)}
CPF: ${orc.cpf}
Telefone: ${orc.telefone || ''}
Endereço: ${capitalizar(orc.endereco || '')}

Itens:
${orc.itens.map(it => '• ' + capitalizar(it.descricao).padEnd(22, ' ') + '  ' + formatarReal(it.valor)).join('\n')}

─────────────────────────────
TOTAL:        ${formatarReal(orc.total)}
─────────────────────────────

Data: ${data}
Agradecemos pela preferência!`;
      if (navigator.share) {
        navigator.share({ title: `Nota Eletrônica - ${loja}`, text: recibo }).catch(() => {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(recibo).then(() => {
          showAviso('Nota eletrônica copiada!', '#10b981');
        }, () => {
          showAviso('Erro ao copiar. Tente manualmente.', '#ef4444');
        });
      } else {
        prompt('Copie a nota eletrônica:', recibo);
      }
    },
    verOrcamento(i) {
      this.verOrcamentoIdx = i;
      this.go('orcamento-cliente');
    },
    salvarTermo() {
      const { nome, texto } = this.termoForm;
      if (!nome || !texto) return;
      const dado = { nome: capitalizar(nome), texto };
      if (this.termoEditando !== null) {
        this.termos[this.termoEditando] = dado;
        this.termoEditando = null;
      } else {
        this.termos.push(dado);
      }
      this.termoForm = { nome: '', texto: '' };
    },
    editarTermo(i) {
      const t = this.termos[i];
      this.termoForm = { nome: t.nome, texto: t.texto };
      this.termoEditando = i;
    },
    excluirTermo(i) {
      if (!confirm('Excluir este termo?')) return;
      this.termos.splice(i, 1);
    },
    aplicarTermo(i) {
      this.termoAtual = this.termos[i];
      alert('Termo aplicado!');
    }
  },
  mounted() {
    window.app = this;
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash.replace('#', '');
    const start = params.get('sec') || hash;
    if (start) this.section = start;
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
          <div v-if="clienteDetalheIdx !== null" class="mb-3">
            <div style="background:#fbbf24;color:#1e293b;border-radius:12px;padding:15px 12px 10px 12px;">
              <h3 style="margin:2px 0 9px 0;font-size:1.07em;">Cliente selecionado</h3>
              <div class="capitalize"><b>Nome:</b> {{ clientes[clienteDetalheIdx].nome }}</div>
              <div class="capitalize"><b>Sobrenome:</b> {{ clientes[clienteDetalheIdx].sobrenome }}</div>
              <div><b>CPF:</b> {{ clientes[clienteDetalheIdx].cpf }}</div>
              <div><b>Telefone:</b> {{ clientes[clienteDetalheIdx].telefone }}</div>
              <div class="capitalize"><b>Endereço:</b> {{ clientes[clienteDetalheIdx].endereco }}</div>
              <button style="margin-top:13px;background:#1e40af;color:#fff;border:none;padding:8px 15px;border-radius:9px;font-weight:500;font-size:1em;cursor:pointer;" @click="fecharClienteDetalhe">Fechar</button>
            </div>
          </div>
          <div id="form-cadastro-cliente">
            <v-text-field label="Nome" v-model="clienteForm.nome" placeholder="Nome"></v-text-field>
            <v-text-field label="Sobrenome" v-model="clienteForm.sobrenome" placeholder="Sobrenome"></v-text-field>
            <v-text-field label="CPF" v-model="clienteForm.cpf" placeholder="CPF (somente números)" maxlength="14" @input="formatCPF"></v-text-field>
            <v-text-field label="Telefone" v-model="clienteForm.telefone" placeholder="(XX) XXXXX-XXXX" maxlength="15" @input="formatTelefone"></v-text-field>
            <v-text-field label="Endereço" v-model="clienteForm.endereco" placeholder="Rua, Número, Bairro, Cidade"></v-text-field>
            <v-btn class="form-btn" @click="salvarCliente">Salvar</v-btn>
            <hr>
            <v-text-field v-model="clienteBusca" class="search-box" placeholder="Buscar cliente (nome, cpf, tel, endereço)..."></v-text-field>
            <ul id="lista-clientes" style="list-style:none; padding:0; margin:0;">
              <li v-for="(cli,i) in clientesFiltrados" :key="i" style="background:#f9fafb;border-radius:10px;padding:8px 8px 7px 8px;margin-bottom:7px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;">
                <span @click="abrirClienteDetalhe(i)" class="capitalize" style="flex:1;">
                  <b>{{ cli.nome }} {{ cli.sobrenome }}</b>
                  <span style="font-size:.96em;">({{ cli.cpf }})</span><br>
                  <span style="font-size:.96em;color:#2563eb">{{ cli.telefone }}</span>
                  <span style="font-size:.93em;color:#777;display:block;" class="capitalize">{{ cli.endereco }}</span>
                </span>
                <button @click.stop="excluirCliente(i)" title="Excluir" style="background:#ef4444;color:#fff;border:none;border-radius:6px;padding:2px 11px;font-size:1em;margin-left:12px;cursor:pointer;">&#128465;</button>
              </li>
              <li v-if="clientesFiltrados.length === 0" style="padding:6px;color:#888">Nenhum cliente encontrado.</li>
            </ul>
            <v-btn class="form-btn" style="background:#fbbf24;color:#1e293b" @click="go('home')">Voltar ao Menu</v-btn>
          </div>
        </div>

        <div class="card" id="cadastro-orcamento" v-show="section === 'cadastro-orcamento'">
          <h2>{{ orcamentoEditando !== null ? 'Editar orçamento' : 'Novo orçamento' }}</h2>
          <v-autocomplete
            label="Cliente"
            :items="clientesOptions"
            item-title="label"
            item-value="idx"
            v-model="orcamentoForm.clienteIdx"
            placeholder="Pesquisar cliente por nome ou CPF..."
            autocomplete="off"
          ></v-autocomplete>
          <div class="itens-orcamento" id="itens-orcamento">
            <div class="item-fields" v-for="(it,idx) in orcamentoForm.itens" :key="idx">
              <input type="text" placeholder="Descrição" class="desc" v-model="it.descricao" maxlength="50" required>
              <input type="text" placeholder="Valor (R$)" class="valor" :value="it.valor ? 'R$ '+it.valor.toLocaleString('pt-BR', {minimumFractionDigits:2}) : ''" maxlength="15" required @input="formatValor(idx, $event)">
              <button type="button" class="remove-item-btn" @click="removerItem(idx)">&times;</button>
            </div>
          </div>
          <div class="itens-lista-total" id="itens-lista-total">{{ orcamentoForm.itens.length>0 ? 'Total deste orçamento: ' + formatarReal(totalOrcamento) : '' }}</div>
          <v-btn type="button" class="add-item-btn" @click="adicionarItem">Adicionar item</v-btn>
          <v-btn class="form-btn" @click="salvarOrcamento">{{ orcamentoEditando !== null ? 'Atualizar' : 'Inserir' }}</v-btn>
          <v-btn class="form-btn" style="background:#fbbf24;color:#1e293b" @click="go('home'); resetOrcamentoForm()">Voltar ao Menu</v-btn>
        </div>

        <div class="card" id="lista-orcamento" v-show="section === 'lista-orcamento'">
          <h2>Orçamentos realizados</h2>
          <v-text-field class="search-box" v-model="orcamentoBusca" placeholder="Pesquisar por nome ou CPF..."></v-text-field>
          <div id="soma-total" class="total-soma">{{ orcamentosFiltrados.length>0 ? 'Soma total: ' + formatarReal(orcamentosFiltrados.reduce((s,o)=>s+o.total,0)) : '' }}</div>
          <ul class="orcamento-list" id="orcamento-list">
            <li v-for="orc in orcamentosFiltrados" :key="orc.idx" class="orcamento-item">
              <b class="capitalize">{{ orc.cliente }}</b> <br>
              CPF: <span style="font-size:.97em">{{ orc.cpf }}</span><br>
              Tel: <span style="font-size:.97em">{{ orc.telefone || '' }}</span><br>
              <span style="font-size:.96em;color:#777;" class="capitalize">{{ orc.endereco || '' }}</span>
              <ul style="padding-left:17px;margin:4px 0 5px 0;">
                <li v-for="(it,i) in orc.itens" :key="i" class="capitalize">{{ it.descricao }} - <span>{{ formatarReal(it.valor) }}</span></li>
              </ul>
              <b>Total: {{ formatarReal(orc.total) }}</b>
              <div class="orcamento-actions">
                <button class="btn-edit" @click="editarOrcamento(orc.idx)">Editar</button>
                <button class="btn-delete" @click="removerOrcamento(orc.idx)">Remover</button>
                <button class="btn-share" @click="compartilharOrcamento(orc.idx)">Compartilhar</button>
                <button class="btn-view" @click="verOrcamento(orc.idx)">Ver</button>
              </div>
            </li>
            <li v-if="orcamentosFiltrados.length===0" class="orcamento-item">Nenhum orçamento cadastrado.</li>
          </ul>
          <v-btn class="form-btn" style="background:#fbbf24;color:#1e293b" @click="go('home')">Voltar ao Menu</v-btn>
        </div>

        <div class="card" id="orcamento-cliente" v-show="section === 'orcamento-cliente'">
          <h2>Orçamento do Cliente</h2>
          <div id="orcamento-dados" v-if="orcamentoVisualizado">
            <b class="capitalize">{{ orcamentoVisualizado.cliente }}</b><br>
            CPF: <span style="font-size:.97em">{{ orcamentoVisualizado.cpf }}</span><br>
            Tel: <span style="font-size:.97em">{{ orcamentoVisualizado.telefone || '' }}</span><br>
            <span style="font-size:.96em;color:#777;" class="capitalize">{{ orcamentoVisualizado.endereco || '' }}</span>
            <ul style="padding-left:17px;margin:4px 0 5px 0;">
              <li v-for="(it,i) in orcamentoVisualizado.itens" :key="i" class="capitalize">{{ it.descricao }} - <span>{{ formatarReal(it.valor) }}</span></li>
            </ul>
            <b>Total: {{ formatarReal(orcamentoVisualizado.total) }}</b>
          </div>
          <div id="orcamento-dados" v-else>Orçamento não encontrado.</div>
          <div id="orcamento-termo" style="margin-top:10px;font-size:.92em;color:#374151" v-if="termoAtual">{{ termoAtual.texto }}</div>
          <v-btn class="form-btn" style="background:#fbbf24;color:#1e293b" @click="voltar">Voltar</v-btn>
        </div>

        <div class="card" id="gerenciar-termo" v-show="section === 'gerenciar-termo'">
          <h2>Gerenciar Termo</h2>
          <v-text-field label="Nome do termo" v-model="termoForm.nome" placeholder="Nome do termo"></v-text-field>
          <v-textarea label="Texto do termo" v-model="termoForm.texto" rows="4" placeholder="Texto do termo"></v-textarea>
          <v-btn class="form-btn" @click="salvarTermo">Salvar</v-btn>
          <ul id="lista-termos" style="list-style:none;padding:0;margin-top:10px;">
            <li v-for="(t,i) in termos" :key="i" class="termo-item">
              <span>{{ t.nome }}</span>
              <button @click="editarTermo(i)">Editar</button>
              <button @click="excluirTermo(i)">Excluir</button>
              <button @click="aplicarTermo(i)">Aplicar</button>
            </li>
            <li v-if="termos.length===0" class="termo-item">Nenhum termo cadastrado.</li>
          </ul>
          <v-btn class="form-btn" style="background:#fbbf24;color:#1e293b" @click="go('home')">Voltar ao Menu</v-btn>
        </div>
      </div>
    </v-main>
    <v-snackbar v-model="snackbar.show" timeout="2100" :style="{ background: snackbar.color, color: '#fff' }">
      {{ snackbar.msg }}
    </v-snackbar>
    <footer style="text-align:center;font-size:.96em;padding:15px 7px 11px 7px;color:#6c584c; background:#f9fafb;">
      Sistema desenvolvido por <b class="capitalize">João & Bruno</b>
    </footer>
  </v-app>
  `
});

app.use(vuetify);
app.mount('#app');

