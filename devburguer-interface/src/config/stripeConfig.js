import { loadStripe } from "@stripe/stripe-js";

// Chave PUBLICAVEL do Stripe - ela e feita para ficar exposta no navegador, o
// que nao pode aparecer aqui e a secreta (sk_...), que vive so na API.
// Mesmo assim ela sai do codigo: assim trocar de modo teste para modo producao
// vira uma mudanca de variavel na Vercel, sem precisar de commit.
const publicKey =
    import.meta.env.VITE_STRIPE_PUBLIC_KEY ||
    'pk_test_51U8JFb2MlmMNzpdeAiGCIdmqK01HRx4JhT3C9YTRWvY5wLgTOsFg33oepTTPKVIEIkbMXwREu4QECR43v2zByUr000qrcRh2Fa'

const stripePromise = loadStripe(publicKey)

export default stripePromise
