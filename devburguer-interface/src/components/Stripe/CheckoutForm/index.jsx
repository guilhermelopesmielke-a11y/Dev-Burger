import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    ContactDetailsElement,
    PaymentElement,
    useCheckoutElements,
} from '@stripe/react-stripe-js/checkout'

import { useCart } from '../../../hooks/CartContext'
import { Form, PayButton, Spinner, StatusMessage } from './styles'

export function CheckoutForm() {

    const [errorMessage, setErrorMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const checkoutState = useCheckoutElements()
    const navigate = useNavigate()
    const { clearCart } = useCart()

    if (checkoutState.type === 'loading') {
        return <StatusMessage>Carregando o pagamento...</StatusMessage>
    }

    if (checkoutState.type === 'error') {
        return <StatusMessage>{checkoutState.error.message}</StatusMessage>
    }

    const { checkout } = checkoutState

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        setErrorMessage(null)

        try {
            // 'if_required' mantem o cliente aqui quando o metodo nao precisa de
            // redirecionamento (cartao). Boleto/Pix mandam para o return_url.
            const result = await checkout.confirm({ redirect: 'if_required' })

            if (result.type === 'error') {
                setErrorMessage(result.error.message)
                return
            }

            // Cartao ja volta 'paid'. Pix nao: a sessao fecha, mas o cliente
            // ainda vai abrir o app do banco, entao o pagamento fica pendente e
            // quem confirma o pedido e o webhook. O carrinho so e limpo quando o
            // dinheiro entrou de fato — se o Pix expirar, o cliente nao perde o
            // que montou.
            if (result.session.status.paymentStatus === 'paid') {
                clearCart()
            }

            navigate('/complete', { state: { sessionId: result.session.id } })
        } catch (error) {
            // Sem este catch, qualquer rejeicao do confirm() deixava o botao
            // girando para sempre e o erro so aparecia no console.
            console.error('Falha ao confirmar o pagamento:', error)
            setErrorMessage('Não foi possível concluir o pagamento. Tente novamente.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            {/* O Checkout so confirma com um e-mail associado ao pagamento.
                Este elemento coleta e valida esse e-mail. */}
            <ContactDetailsElement />
            <PaymentElement options={{ layout: 'accordion' }} />
            <PayButton type="submit" disabled={isLoading}>
                {isLoading ? <Spinner /> : `Pagar ${checkout.total.total.amount}`}
            </PayButton>
            {errorMessage && <StatusMessage>{errorMessage}</StatusMessage>}
        </Form>
    )
}
