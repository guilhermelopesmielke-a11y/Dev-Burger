import stripe from "../../../config/stripe.js";
import { createOrderFromSession } from "../../services/createOrderFromSession.js";

/*
  Por que o webhook e obrigatorio a partir do Pix:

  Cartao e sincrono — o navegador ja sabe o resultado quando o confirm() volta.
  Pix nao: o cliente recebe um QR Code e paga no app do banco, o que pode
  levar minutos e acontecer com a aba do site ja fechada. Se o pedido fosse
  criado no front, todo pagamento por Pix viraria dinheiro recebido sem pedido
  registrado.

  Eventos que interessam:
  - checkout.session.completed .............. cartao, ja chega com payment_status 'paid'
  - checkout.session.async_payment_succeeded  Pix, chega quando o cliente efetivamente paga
  - checkout.session.async_payment_failed ... Pix expirou ou falhou

  Em desenvolvimento este webhook so chega se o `stripe listen` estiver rodando
  (o Stripe nao alcanca o localhost). Por isso o /session-status tambem cria o
  pedido — ver createOrderFromSession.
*/
const PAID_EVENTS = [
    "checkout.session.completed",
    "checkout.session.async_payment_succeeded",
];

class StripeWebhook {
    async handle(req, res) {
        const signature = req.headers["stripe-signature"];

        let event;

        try {
            // req.body precisa ser o Buffer cru: e sobre os bytes originais que
            // a assinatura foi calculada. Por isso a rota e montada com
            // express.raw() antes do express.json() no app.js.
            event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET,
            );
        } catch (err) {
            // Assinatura invalida: a requisicao nao veio do Stripe.
            return res.status(400).json({ error: `Webhook Error: ${err.message}` });
        }

        if (!PAID_EVENTS.includes(event.type)) {
            return res.json({ received: true });
        }

        const session = event.data.object;

        // O checkout.session.completed do Pix chega ANTES do pagamento, com
        // payment_status 'unpaid'. O pedido so nasce quando o dinheiro entra.
        if (session.payment_status !== "paid") {
            return res.json({ received: true });
        }

        try {
            await createOrderFromSession(session);
        } catch (err) {
            console.error("Falha ao criar pedido a partir do webhook:", err);

            // 500 faz o Stripe reagendar o reenvio do evento, em vez de
            // considerar entregue um pagamento que nao virou pedido.
            return res.status(500).json({ error: "order creation failed" });
        }

        return res.json({ received: true });
    }
}

export default new StripeWebhook();
