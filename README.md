# Amigos Móveis Planejados — Sistema de Orçamentos

Sistema web simples, moderno e responsivo para **cadastro de clientes**, **criação de orçamentos** e **gestão de vendas**.

Desenvolvido especialmente para a loja **Amigos Móveis Planejados**.

Você pode testar a aplicação online através do [GitHub Pages](https://joaonascimentobr.github.io/SistemaDeOrcamento/index.html).

---

## Funcionalidades

- Cadastro de clientes com nome, sobrenome, CPF, telefone e endereço
- Pesquisa dinâmica de clientes
- Criação e edição de orçamentos para clientes cadastrados
- Adição de múltiplos itens em cada orçamento
- Valores formatados automaticamente em reais (R$)
- Pesquisa de orçamentos por **Nome** ou **CPF**
- Edição e remoção de orçamentos e clientes
- Compartilhamento de orçamentos como **nota eletrônica** (copia texto ou usa nativo do telemóvel)
- Design responsivo e visual limpo, otimizado para dispositivos móveis
- Todas as iniciais de nomes e endereços são sempre maiúsculas

---

## Estrutura dos arquivos

- **index.html** — Página inicial com o menu principal
- **domains/** — Agrupa todos os domínios
  - **clientes/** — Domínio de clientes
    - **index.html** — Tela para cadastro e consulta de clientes
    - **cadastro-cliente.js** — Lógica da tela de clientes
    - **clientes.css** — Estilos específicos do domínio
  - **orcamentos/** — Domínio de orçamentos
    - **novo-orcamento.html** — Formulário para criação de orçamentos
    - **lista-orcamento.html** — Listagem e gestão de orçamentos existentes
    - **orcamento/** — Subdomínio para visualizar o orçamento de um cliente
      - **index.html** — Página com os detalhes do orçamento
      - **orcamento.js** — Script do orçamento individual
    - **novo-orcamento.js** — Rotinas para criar e editar orçamentos
    - **lista-orcamento.js** — Ações da listagem de orçamentos
    - **orcamentos.css** — Estilos específicos do domínio
- **styles.css** — Estilo visual, responsividade, fontes, cores
- **script.js** — Funções e dados compartilhados
- **README.md** — Este arquivo com instruções

---

## Dúvidas ou melhorias?

Este sistema foi feito para facilitar a gestão do seu negócio.  
Se quiser mais funcionalidades (assinatura digital, WhatsApp, impressão, Pix, relatórios, backup, envio para e-mail), acesse o sistema clicando no [site oficial](https://exemplo.com).

---

**Desenvolvido por eu ele.**  

