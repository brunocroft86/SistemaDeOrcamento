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

## Regras de commit
- Descreva de forma objetiva as alterações, mencionando o domínio afetado quando aplicável.
- Certifique-se de que os testes e linters executem com sucesso antes do commit.

Ao adicionar este `AGENTS.md`, os agentes do Codex sempre lerão essas instruções para manter o padrão de DDD, POO e SOLID ao modificar o projeto.
