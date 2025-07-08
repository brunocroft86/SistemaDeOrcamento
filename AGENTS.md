# AGENTS.md

Este repositório deve seguir os princípios de **Domain Driven Design (DDD)**, **POO** e **SOLID**.

## Diretrizes gerais
- **Arquitetura DDD:** Separe o código em domínios claros. Use entidades, value objects, repositórios e serviços de domínio.
- **POO e SOLID:**  
  - Garanta que cada classe tenha uma única responsabilidade.  
  - Escreva classes e módulos abertos para extensão, mas fechados para modificação.  
  - Mantenha substituições corretas (Liskov).  
  - Separe interfaces especializadas e injete dependências.
- **Organização de pastas:** coloque cada domínio em uma pasta própria dentro de `domains/`. Outros módulos ou serviços devem seguir a mesma estrutura.
- **Testes:** cada módulo/diretório de domínio deve ter testes unitários e/ou de integração.
- **Interfaces:** toda interface criada no projeto deve possuir o prefixo `I`, como `ICliente` e `IOrcamento`.

## Diretrizes para uso de Vue e Vuetify
- Utilize componentes do **Vuetify** sempre que possível para garantir padronização visual.
- Crie componentes Vue reutilizáveis e com responsabilidade única.
- Use a extensão `.vue` para todos os componentes.
- Siga a estrutura de arquivos: `<NomeDoComponente>.vue`, com PascalCase.
- Prefira a composição por slots e props ao invés de lógica acoplada.
- Documente as props e eventos dos componentes.
- Utilize o padrão de diretórios: componentes globais em `src/components/`, específicos de domínio em `domains/<domínio>/components/`.
- Sempre utilize o sistema de temas e variáveis do Vuetify para cores e espaçamentos.
- Evite lógica de negócio nos componentes de UI; mantenha-a nos serviços ou stores.

## Regras de commit
- Descreva de forma objetiva as alterações, mencionando o domínio afetado quando aplicável.
- Todo commit deve ser em portugues-br.
- Certifique-se de que os testes e linters executem com sucesso antes do commit.

## Regras para criação de branches
- Nunca utilize caracteres especiais (como acentos, espaços, cedilha, etc) nos nomes das branches. Use apenas letras minúsculas, números e hífens (`-`).
- Exemplo de nome correto: `orcamento-listagem-ajustes`.

Ao adicionar este `AGENTS.md`, os agentes do Codex sempre lerão essas instruções para manter o padrão de DDD, POO, SOLID, Vue e Vuetify ao modificar o projeto.

## Regras de resposta no codex
- Sempre interaja comigo no chat em português
