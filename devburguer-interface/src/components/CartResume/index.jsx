import { useCart } from '../../hooks/CartContext'
import { formatedPrice } from '../../utils/formatPrice'
import { api } from '../../services/api'
import { Body, Container, FinishButton, Header, ResumeCard, Row, TotalRow } from './styles'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export function CartResume() {

    const [finalPrice, setfinalPrice] = useState(0)
    const navigate = useNavigate()
    const { cartProducts } = useCart()

    useEffect(() => {
        const subtotal = cartProducts.reduce((acc, product) => {
            return acc + product.price * product.quantity
        }, 0)

        setfinalPrice(subtotal)
    }, [cartProducts])

    // O pedido NAO nasce aqui. Aqui so abrimos a sessao de pagamento: quem grava
    // o pedido e o back-end, depois de confirmar com o Stripe que o dinheiro
    // entrou (webhook + /session-status). Criar o pedido no front deixaria Pix
    // pago sem pedido — e pedido registrado sem pagamento.
    const submitOrder = async () => {
        const products = cartProducts.map((product) => {
            return { id: product.id, quantity: product.quantity, price: product.price }
        })

        try {
            const { data } = await api.post('/create-checkout-session', { products })

            navigate('/checkout', {
                state: data,
            })
        } catch (error) {
            toast.error('Erro, tente novamente', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const total = finalPrice

    return (
        <Container>
            <ResumeCard>
                <Header>Resumo do pedido</Header>
                <Body>
                    <Row>
                        <p>Itens</p>
                        <span>{formatedPrice(finalPrice)}</span>
                    </Row>
                    <TotalRow>
                        <p>Total</p>
                        <span>{formatedPrice(total)}</span>
                    </TotalRow>
                </Body>
            </ResumeCard>
            <FinishButton onClick={submitOrder}>Finalizar pedido</FinishButton>
        </Container>
    )
}
