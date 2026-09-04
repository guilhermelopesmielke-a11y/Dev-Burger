import stripe from "../../../config/stripe.js";
import { createOrderFromSession } from "../../services/createOrderFromSession.js";

/*
  Usado pela tela /complete. Com Pix o cliente cai nessa tela antes de o
  pagamento ser confirmado, entao o front consulta este endpoint ate o
  payment_status virar 'paid' (ou a sessao expirar).

  Alem de responder o status, este endpoint GRAVA o pedido quando a sessao ja
  esta paga. Sem isso, em desenvolvimento nenhum pedido chegava ao banco: o
  unico lugar que criava pedido era o webhook, e o Stripe nao alcanca o
  localhost sem o `stripe listen` rodando. A criacao e idempotente, entao
  webhook e polling podem coexistir sem duplicar nada.
*/
class SessionStatus {
    async show(req, res) {
        const { session_id } = req.query;

        if (!session_id) {
            return res.status(400).json({ error: "session_id is required" });
        }

        let session;

        try {
            session = await stripe.checkout.sessions.retrieve(session_id);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }

        // O id da sessao vai e volta pela URL do /complete. Sem esta conferencia,
        // qualquer usuario logado poderia consultar a compra de outro.
        if (session.metadata?.user_id && session.metadata.user_id !== String(req.userId)) {
            return res.status(403).json({ error: "Session does not belong to this user" });
        }

        if (session.payment_status === "paid") {
            try {
                await createOrderFromSession(session);
            } catch (err) {
                // O pagamento existe de verdade — nao podemos responder um erro
                // que faria o front achar que a compra falhou. Registramos e
                // seguimos: o webhook ainda vai reprocessar esta sessao.
                console.error("Falha ao criar pedido a partir do /session-status:", err);
            }
        }

        return res.json({
            status: session.status,
            payment_status: session.payment_status,
        });
    }
}

export default new SessionStatus();
