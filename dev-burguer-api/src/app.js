import express from "express";
import routes from "./routes.js";
import fileRouteConfig from "./config/fileRoutes.cjs";
import cors from "cors";
import StripeWebhook from "./app/controllers/stripe/StripeWebhook.js";

const app = express();

app.use(cors());

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

app.use(routes);

export default app;
