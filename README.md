# Dev Burguer

Projeto full stack de uma hamburgueria, composto por dois aplicativos:

| Pasta | O que e | Stack |
|---|---|---|
| [`dev-burguer-api`](./dev-burguer-api) | API REST — usuarios, autenticacao, produtos, categorias, pedidos e checkout | Node.js, Express, Sequelize/PostgreSQL, MongoDB, Stripe |
| [`devburguer-interface`](./devburguer-interface) | Interface web — vitrine, carrinho, login e area administrativa | React, Vite, styled-components, React Router |

## Pre-requisitos

- Node.js 22+
- pnpm
- PostgreSQL (dados relacionais: usuarios, produtos, categorias)
- MongoDB (pedidos)
- Conta no Stripe (checkout)

## Como rodar localmente

### 1. API

```bash
cd dev-burguer-api
cp .env.example .env   # preencha as variaveis
pnpm install
pnpm migrate
pnpm dev
```

Sobe em `http://localhost:3000`.

### 2. Interface

```bash
cd devburguer-interface
pnpm install
pnpm dev
```

Sobe em `http://localhost:5173`. Para apontar para outra API, crie um `.env` a
partir do `.env.example` e defina `VITE_API_URL`.

## Variaveis de ambiente

Nenhum segredo fica no codigo: a API le tudo de `dev-burguer-api/.env`, que
**nao e versionado**. O `.env.example` documenta cada variavel.

| Variavel | Descricao |
|---|---|
| `PORT` | Porta do servidor. Em producao a plataforma define sozinha |
| `APP_URL` | Endereco publico da propria API, usado para montar a URL das imagens |
| `DATABASE_URL` | String de conexao do Postgres. Substitui as `DB_*` e liga o SSL |
| `DB_HOST` / `DB_PORT` / `DB_USER` / `DB_PASSWORD` / `DB_NAME` | Postgres local, quando nao ha `DATABASE_URL` |
| `DB_SSL` | Forca ligar/desligar SSL no Postgres |
| `MONGO_URL` | Conexao do MongoDB (pedidos) |
| `JWT_SECRET` / `JWT_EXPIRES_IN` | Assinatura e validade dos tokens |
| `STRIPE_SECRET_KEY` | Chave secreta do Stripe |
| `STRIPE_WEBHOOK_SECRET` | Segredo que valida a assinatura do webhook |
| `FRONTEND_URL` | URL do front. Define o redirect do Stripe e a lista do CORS |

A interface usa `VITE_API_URL` e `VITE_STRIPE_PUBLIC_KEY`. Por serem lidas pelo
navegador, ambas sao publicas por natureza — nunca coloque segredo em `VITE_*`.

## Deploy

| Peca | Servico | Plano |
|---|---|---|
| Interface | Vercel | free |
| API | Render (Web Service) | free |
| PostgreSQL | Neon | free |
| MongoDB | MongoDB Atlas | free (M0) |

### 1. Bancos

No **Neon**, crie um projeto e copie a connection string (`postgresql://...`).
No **MongoDB Atlas**, crie um cluster M0, um usuario de banco, libere o acesso
de qualquer IP (`0.0.0.0/0`, porque o IP do Render muda) e copie a URI
`mongodb+srv://...`, acrescentando `/devburguer` antes da `?`.

### 2. API no Render

`New > Blueprint` e aponte para este repositorio. O [`render.yaml`](./render.yaml)
ja traz build, start, health check e a lista de variaveis; o Render so pergunta
os valores. Deixe `APP_URL` e `FRONTEND_URL` com um valor provisorio e volte
para corrigir depois que as URLs existirem.

O plano free hiberna apos 15 minutos sem trafego — a primeira requisicao
seguinte leva cerca de 50 segundos para responder.

### 3. Catalogo e conta de admin

As migrations criam as tabelas vazias. Para a vitrine nao nascer sem produtos,
abra o SQL Editor do Neon e rode o [`seed.sql`](./dev-burguer-api/seed.sql) — sao
as 4 categorias e os 38 produtos, apontando para as imagens que ja estao
versionadas em `dev-burguer-api/uploads/`.

O seed nao traz usuarios de proposito: hash de senha de conta real nao entra em
repositorio publico. Cadastre-se pelo proprio site e promova a conta a admin no
SQL Editor:

```sql
UPDATE public.users SET admin = true WHERE email = 'seu@email.com';
```

O cadastro publico sempre cria a conta como nao-admin, entao essa promocao
manual e a unica forma de liberar a area administrativa.

### 4. Interface na Vercel

`Add New > Project`, escolha este repositorio e defina **Root Directory** como
`devburguer-interface`. O build (`pnpm build` / `dist`) e detectado sozinho e o
[`vercel.json`](./devburguer-interface/vercel.json) cuida do roteamento do React
Router. Adicione as variaveis:

- `VITE_API_URL` = URL da API no Render
- `VITE_STRIPE_PUBLIC_KEY` = chave publicavel do Stripe

### 5. Fechando o circuito

Com as duas URLs em maos, volte no Render e ajuste `APP_URL` (URL da API) e
`FRONTEND_URL` (URL da Vercel). Depois, no painel do Stripe, crie um webhook
apontando para `https://sua-api.onrender.com/stripe/webhook` com o evento
`checkout.session.completed` e copie o `whsec_...` para `STRIPE_WEBHOOK_SECRET`.

### Limitacao conhecida

O disco do Render free e efemero. As imagens em `dev-burguer-api/uploads/` estao
versionadas e sobrevivem ao deploy, mas toda imagem enviada pela area
administrativa depois disso se perde no proximo restart. Para resolver de vez, o
`multer` precisa gravar em um storage externo (Cloudinary, Supabase Storage, S3)
em vez do disco local.
