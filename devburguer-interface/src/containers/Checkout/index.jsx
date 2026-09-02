import { useMemo } from "react"
import { useLocation } from "react-router-dom"
import { CheckoutElementsProvider } from "@stripe/react-stripe-js/checkout"

import stripePromise from "../../config/stripeConfig"
import { CheckoutForm } from "../../components/Stripe/CheckoutForm"
import { useUser } from "../../hooks/UserContext"
import { Container, ErrorMessage } from "./styles"

export function Checkout(){

    // Optional chaining porque state e null se o usuario abrir /checkout direto.
    const clientSecret = useLocation().state?.clientSecret
    const { userInfo } = useUser()
    const userEmail = userInfo?.email

    // O Checkout so confirma o pagamento com um e-mail associado a sessao.
    // defaultValues precisa ficar aqui, na inicializacao: passar para o
    // ContactDetailsElement nao preenche nada.
    const options = useMemo(
        () => ({
            clientSecret,
            ...(userEmail && { defaultValues: { email: userEmail } }),
        }),
        [clientSecret, userEmail],
    )

    if(!clientSecret){
        return(
            <Container>
                <ErrorMessage>
                    Erro, não foi possível processar o pagamento. Tente novamente.
                </ErrorMessage>
            </Container>
        )
    }

    return(
        <Container>
            <CheckoutElementsProvider stripe={stripePromise} options={options}>
                <CheckoutForm />
            </CheckoutElementsProvider>
        </Container>
    )
}
