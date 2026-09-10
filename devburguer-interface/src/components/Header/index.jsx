import {
    Container,
    Navigation,
    Options,
    Profile,
    LinkContainer,
    HeaderLink,
    Logout,
    CartTarget,
    CartPulse,
} from './styles'
import { useNavigate, useResolvedPath } from 'react-router-dom'
import {UserCircle, ShoppingCart, ShoppingCartIcon} from "@phosphor-icons/react"
import { useUser } from '../../hooks/UserContext'
import { useTheme } from 'styled-components'
import { useCartAnimation } from '../../hooks/CartAnimationContext'

export function Header() {
    const navigate = useNavigate()
    const {pathname} = useResolvedPath()
    const {logout, userInfo} = useUser()
    const theme = useTheme()
    const {registerCartTarget, cartPulseKey} = useCartAnimation()

    function logoutUser() {
        logout()
        navigate('/login')
    }

    return (
        <Container>
            <Navigation>
                <div>
                    <HeaderLink to='/home' $isActive={pathname ==='/home'}>
                        Home
                    </HeaderLink>
                    <HeaderLink to='/cardapio' $isActive={pathname ==='/cardapio'}>
                        Cardápio
                    </HeaderLink>
                </div>
            </Navigation>
            <Options>
                <Profile>
                    <UserCircle color={theme.white} size={24}></UserCircle>
                    <div>
                        <p>Óla, <span>{userInfo.name}</span></p>
                        <Logout onClick={logoutUser} >Sair</Logout>
                    </div>
                </Profile>
            </Options>
            <LinkContainer>
                <CartTarget ref={registerCartTarget}>
                    {/* A `key` remonta o icone a cada chegada: e o jeito mais
                        direto de rebobinar uma animacao CSS que ja rodou. */}
                    <CartPulse key={cartPulseKey} $isActive={cartPulseKey > 0}>
                        <ShoppingCart color={theme.white} size={24}></ShoppingCart>
                    </CartPulse>
                </CartTarget>
                <HeaderLink to='/carrinho'>Carrinho</HeaderLink>
            </LinkContainer>
        </Container>
    )
}