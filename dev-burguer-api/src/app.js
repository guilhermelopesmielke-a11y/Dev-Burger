import express from "express";
import routes from "./routes.js";
import fileRouteConfig from "./config/fileRoutes.cjs";
import cors from "cors";
import StripeWebhook from "./app/controllers/stripe/StripeWebhook.js";

const app = express();

// Sem lista de origens o cors() libera a API para qualquer site da internet.
// FRONTEND_URL aceita varias URLs separadas por virgula, entao o Vite local e o
// dominio de producao podem conviver na mesma configuracao.
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({ origin: allowedOrigins }));

// Precisa vir ANTES do express.json(). A verificacao de assinatura do Stripe e
// feita sobre os bytes crus do corpo; se o json() consumir o stream primeiro, a
// assinatura nunca confere. Tambem fica fora do authMiddleware, porque quem
// chama e o Stripe, nao o navegador logado.
app.post(
    "/stripe/webhook",
    express.raw({ type: "application/json" }),
    StripeWebhook.handle,
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/product-file', fileRouteConfig);
app.use('/category-file', fileRouteConfig);

// Sinal de vida publico, usado pela plataforma de deploy para saber se o
// container subiu. Fica fora do routes porque la tudo passa pelo authMiddleware,
// e nao daria para checar a saude da API sem estar logado.
app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use(routes);

export default app;
