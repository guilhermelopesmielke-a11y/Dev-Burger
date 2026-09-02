import Product from "../../models/Product.js";
import Category from "../../models/Category.js";
import Order from "../../../database/schemas/Order.js";
import stripe from "../../../config/stripe.js";

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
*/
const PAID_EVENTS = [
    "checkout.session.completed",
    "checkout.session.async_payment_succeeded",
];

async function createOrderFromSession(session) {
    // Idempotencia: o Stripe reenvia eventos que falham, e um Pix dispara dois
    // eventos diferentes para a mesma sessao. Sem isso o pedido duplicaria.
    const alreadyCreated = await Order.findOne({ stripeSessionId: session.id });

    if (alreadyCreated) {
        return;
    }

    const { user_id, user_name, products } = session.metadata;

    // Guardado como [[id, quantidade], ...] no CreateCheckoutSession.
    const orderedProducts = JSON.parse(products);

    const findedProducts = await Product.findAll({
        where: {
            id: orderedProducts.map(([id]) => id),
        },
        include: {
            model: Category,
            as: "category",
            attributes: ["name"],
        },
    });

    const mapedProducts = findedProducts.map(product => {
        const [, quantity] = orderedProducts.find(([id]) => id === product.id);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
            url: product.url,
            category: product.category.name,
            quantity,
        };
    });

    await Order.create({
        user: {
            id: user_id,
            name: user_name,
        },
        products: mapedProducts,
        status: "Pedido realizado",
        stripeSessionId: session.id,
    });
}

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
