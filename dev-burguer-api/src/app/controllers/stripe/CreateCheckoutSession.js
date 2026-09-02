import * as Yup from "yup";
import Product from "../../models/Product.js";
import stripe from "../../../config/stripe.js";

class CreateCheckoutSession {
    async store(req, res) {
        const schema = Yup.object({
            products: Yup.array().required().of(
                Yup.object({
                    id: Yup.number().required(),
                    quantity: Yup.number().required(),
                })
            )
        });

        try {
            schema.validateSync(req.body, { abortEarly: false, strict: true });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        const { products } = req.body;

        const findedProducts = await Product.findAll({
            where: {
                id: products.map(product => product.id)
            }
        });

        // O preco vem sempre do banco, nunca do body: senao o cliente poderia
        // enviar o valor que quisesse e pagar centavos pelo pedido.
        const lineItems = findedProducts.map(product => {
            const { quantity } = products.find(p => p.id === product.id);

            return {
                price_data: {
                    currency: "brl",
                    // Stripe cobra em centavos (inteiro). O Math.round evita que
                    // 34.90 * 100 vire 3489.9999 e a API rejeite.
                    unit_amount: product.price,
                    product_data: {
                        name: product.name,
                    },
                },
                quantity,
            };
        });

        try {
            const session = await stripe.checkout.sessions.create({
                ui_mode: "elements",
                mode: "payment",
                line_items: lineItems,
                return_url: `${process.env.FRONTEND_URL}/complete?session_id={CHECKOUT_SESSION_ID}`,
                // O padrao do Pix e 4h. Pedido de comida confirmado 4h depois nao
                // serve para ninguem, entao encurtamos para 1h.
                payment_method_options: {
                    pix: { expires_after_seconds: 3600 },
                },
                metadata: {
                    user_id: String(req.userId),
                    user_name: String(req.userName),
                    // O webhook remonta o pedido a partir daqui, entao guardamos
                    // [id, quantidade] no formato mais curto possivel: metadata do
                    // Stripe aceita no maximo 500 caracteres por valor.
                    products: JSON.stringify(products.map(p => [p.id, p.quantity])),
                },
            });

            return res.status(201).json({ clientSecret: session.client_secret });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

export default new CreateCheckoutSession();
