import stripe from "../../../config/stripe.js";

/*
  Usado pela tela /complete. Com Pix o cliente cai nessa tela antes de o
  pagamento ser confirmado, entao o front consulta este endpoint ate o
  payment_status virar 'paid' (ou a sessao expirar).
*/
class SessionStatus {
    async show(req, res) {
        const { session_id } = req.query;

        if (!session_id) {
            return res.status(400).json({ error: "session_id is required" });
        }

        try {
            const session = await stripe.checkout.sessions.retrieve(session_id);

            return res.json({
                status: session.status,
                payment_status: session.payment_status,
            });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

export default new SessionStatus();
