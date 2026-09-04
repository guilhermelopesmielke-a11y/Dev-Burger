import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Order from "../../database/schemas/Order.js";

/*
  Cria o pedido a partir de uma sessao ja PAGA do Stripe.

  Duas rotas chamam esta funcao, de proposito:

  - StripeWebhook ... e o caminho confiavel. Funciona mesmo com a aba fechada,
    e e o unico que cobre o Pix compensado minutos depois. Em producao, e ele
    quem manda.
  - SessionStatus .. e a rede de seguranca. Em desenvolvimento o Stripe nao
    alcanca o localhost (precisaria do `stripe listen` rodando), entao sem isso
    todo pagamento no cartao terminava sem pedido nenhum no banco.

  As duas podem rodar para a mesma sessao — a idempotencia abaixo garante um
  unico pedido.
*/
export async function createOrderFromSession(session) {
    // O Stripe reenvia eventos que falham, e um Pix dispara dois eventos
    // diferentes para a mesma sessao. Sem isso o pedido duplicaria.
    const alreadyCreated = await Order.findOne({ stripeSessionId: session.id });

    if (alreadyCreated) {
        return alreadyCreated;
    }

    const { user_id, user_name, products } = session.metadata ?? {};

    // Sessao sem metadata nao foi criada pelo nosso checkout: sem os produtos
    // nao ha pedido a remontar.
    if (!products) {
        return null;
    }

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

    try {
        return await Order.create({
            user: {
                id: user_id,
                name: user_name,
            },
            products: mapedProducts,
            status: "Pedido realizado",
            stripeSessionId: session.id,
        });
    } catch (err) {
        // Webhook e polling do /complete podem chegar ao mesmo tempo: os dois
        // passam pelo findOne acima antes de qualquer um gravar. O indice unico
        // de stripeSessionId barra o segundo — e isso e sucesso, nao erro.
        if (err.code === 11000) {
            return Order.findOne({ stripeSessionId: session.id });
        }

        throw err;
    }
}

export default createOrderFromSession;
