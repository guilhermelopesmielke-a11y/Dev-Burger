import Logo from '../../assets/Logo 1.png'
import { CartItems } from '../../components/CartItems'
import { CartResume } from '../../components/CartResume'
import { Banner, Container, Content, Title } from './styles'

export function Cart(){

    return(
        <Container>
            <Banner>
                <img src={Logo} alt="Logo DevBurguer"/>
            </Banner>
            <Title>Checkout - Pedido</Title>
            <Content>
                <CartItems/>
                <CartResume/>
            </Content>
        </Container>
    )
}