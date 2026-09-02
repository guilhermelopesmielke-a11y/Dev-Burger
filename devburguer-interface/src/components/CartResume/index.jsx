import { useCart } from '../../hooks/CartContext'
import { formatedPrice } from '../../utils/formatPrice'
import { api } from '../../services/api'
import { Body, Container, FinishButton, Header, ResumeCard, Row, TotalRow } from './styles'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


// mesma unidade de product.price (centavos). Valor provisorio ate confirmar no Figma
const DELIVERY_TAX = 500

export function CartResume() {

    const [finalPrice, setfinalPrice] = useState(0)
    const [deliveryTax] = useState(500)
    const navigate = useNavigate()
    const { cartProducts, clearCart } = useCart()

    useEffect(() => {
        const subtotal = cartProducts.reduce((acc, product) => {
            return acc + product.price * product.quantity
        }, 0)

        setfinalPrice(subtotal)
    }, [cartProducts])

    const submitOrder = async () => {
        const products = cartProducts.map((product) => {
            return { id: product.id, quantity: product.quantity, price: product.price }
        })

        try {
            const {data} = await api.post('/create-checkout-session', { products })

            navigate('/checkout',{
                state:data,
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

        // try {
        //     const { status } = await api.post("/orders", { products },
        //         {
        //             validateStatus: () => true,
        //         }
        //     )
        //     if (status === 201 || status === 200) {
        //         toast.success("Pedido realizado com sucesso!")
        //         setTimeout(() => {
        //             navigate("/home")
        //             clearCart()
        //         }, 2000)
        //     } else if (status === 409) {
        //         toast.error("Falha ao realizar pedido!")
        //     } else {
        //         throw new Error()
        //     }

        //     console.log(status);
        // } catch {
        //     toast.error("Falha no sistema! Tente novamente")
        // }
    }

    const total = finalPrice + deliveryTax

    return (
        <Container>
            <ResumeCard>
                <Header>Resumo do pedido</Header>
                <Body>
                    <Row>
                        <p>Itens</p>
                        <span>{formatedPrice(finalPrice)}</span>
                    </Row>
                    <Row>
                        <p>Taxa de entrega</p>
                        <span>{formatedPrice(deliveryTax)}</span>
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
