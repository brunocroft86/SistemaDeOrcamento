# Amigos Móveis Planejados — Sistema de Orçamentos

Agora utilizando **Vue 3** e **Vuetify 3** em uma única aplicação SPA para uma experiência moderna.

Sistema web simples, moderno e responsivo para **cadastro de clientes**, **criação de orçamentos** e **gestão de vendas**.

Desenvolvido especialmente para a loja **Amigos Móveis Planejados**.

Você pode testar a aplicação online através do [GitHub Pages](https://brunocroft86.github.io/SistemaDeOrcamento/).

---

## Funcionalidades

- Cadastro de clientes com nome, sobrenome, CPF, múltiplos telefones e endereço
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

- **index.html** — Página inicial simples com atalhos para clientes e orçamentos
- **domains/** — Scripts e estilos de cada domínio
  - **clientes/**
    - **index.html** — Redireciona para `lista-clientes.html`
    - **lista-clientes.html** — Lista de clientes consumindo API futura
    - **cadastro-cliente.html** — Formulário de cadastro de cliente
    - **cadastro-cliente.js** — Lógica de clientes
    - **cadastro-cliente.page.js** — Inicialização da página de cadastro
    - **clientes.css** — Estilos do domínio
  - **orcamentos/**
    - **novo-orcamento.html** — Redireciona para `index.html?sec=cadastro-orcamento`
    - **lista-orcamento.html** — Redireciona para `index.html?sec=lista-orcamento`
    - **orcamento/**
      - **index.html** — Redireciona para `index.html?sec=orcamento-cliente&idx=`
      - **orcamento.js** — Script do orçamento individual
    - **novo-orcamento.js** — Rotinas para criar e editar orçamentos
    - **lista-orcamento.js** — Ações da listagem de orçamentos
    - **orcamentos.css** — Estilos do domínio
- **styles.css** — Estilo visual e cores
- **script.js** — Funções e dados compartilhados
- **README.md** — Este arquivo

---

## Dúvidas ou melhorias?

Este sistema foi feito para facilitar a gestão do seu negócio.  
Se quiser mais funcionalidades (assinatura digital, WhatsApp, impressão, Pix, relatórios, backup, envio para e-mail), acesse o sistema clicando no [site oficial](https://exemplo.com).

---

**Desenvolvido por eu ele.**  
