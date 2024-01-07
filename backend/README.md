
# Sistema de Feature Flags

Este projeto implementa um sistema de feature flags, permitindo o controle de funcionalidades de uma aplicação de forma dinâmica.

## Introdução

O sistema de feature flags permite ativar ou desativar funcionalidades sem a necessidade de realizar novos deploys. Isso facilita testes A/B, deploy de funcionalidades em canary e a gestão de acesso a novos recursos.

## Tecnologias Utilizadas

- Node.js
- Express
- SQLite
- TypeScript

## Como Rodar

1. Clone o repositório:
   ```
   git clone git@github.com:Claytonrss/feature-flag.git
   ```
2. Instale as dependências:
   ```
   npm install
   ```
3. Inicie o servidor:
   ```
   npm start
   ```

## Estrutura do Projeto

- `src/`: Código fonte do projeto.
  - `controllers/`: Controladores que manipulam as requisições e respostas.
  - `services/`: Serviços que contêm a lógica de negócios.
  - `repositories/`: Repositórios que gerenciam as operações de banco de dados.
  - `routes/`: Definições de rotas/endpoints.
  - `utils/`: Utilitários e configurações.
  - `database/`: Scripts relacionados ao banco de dados.

## Testes

Para rodar os testes, execute:

```
npm test
```