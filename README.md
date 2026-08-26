# Dev Burguer

Projeto full stack de uma hamburgueria, composto por dois aplicativos:

| Pasta | O que e | Stack |
|---|---|---|
| [`dev-burguer-api`](./dev-burguer-api) | API REST — usuarios, autenticacao, produtos, categorias, pedidos e checkout | Node.js, Express, Sequelize/PostgreSQL, MongoDB, Stripe |
| [`devburguer-interface`](./devburguer-interface) | Interface web — vitrine, carrinho, login e area administrativa | React, Vite, styled-components, React Router |

## Pre-requisitos

- Node.js 18+
- pnpm
- PostgreSQL (dados relacionais: usuarios, produtos, categorias)
- MongoDB (pedidos)
- Conta no Stripe (checkout)

## Como rodar

### 1. API

```bash
cd dev-burguer-api
pnpm install
pnpm sequelize db:migrate
pnpm dev
```

Sobe em `http://localhost:3000`.

### 2. Interface

```bash
cd devburguer-interface
pnpm install
pnpm dev
```

Sobe em `http://localhost:5173`. A URL da API fica em `src/services/api.js`.

## Variaveis de ambiente

A API le suas variaveis de `dev-burguer-api/.env`, que **esta versionado neste repositorio** por se tratar de um repo privado. O arquivo `.env.example` fica como referencia do que cada variavel significa.

| Variavel | Descricao |
|---|---|
| `STRIPE_SECRET_KEY` | Chave secreta do Stripe |
| `FRONTEND_URL` | URL do front, para onde o Stripe redireciona apos o pagamento |

As credenciais do PostgreSQL ficam em `src/config/database.cjs` e o segredo do JWT em `src/config/auth.js`.

> **Atencao:** este repositorio contem credenciais reais (chave do Stripe, segredo do JWT, senha do banco). Mantenha-o **privado**. Se um dia for torna-lo publico, rotacione as chaves antes.
