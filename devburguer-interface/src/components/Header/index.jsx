import {
    Container,
    Navigation,
    Options,
    Profile,
    LinkContainer,
    HeaderLink,
    Logout,
} from './styles'
import { useNavigate, useResolvedPath } from 'react-router-dom'
import {UserCircle, ShoppingCart, ShoppingCartIcon} from "@phosphor-icons/react"
import { useUser } from '../../hooks/UserContext'

export function Header() {
    const navigate = useNavigate()
    const {pathname} = useResolvedPath()
    const {logout, userInfo} = useUser()

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
                    <UserCircle color='#fff'size={24}></UserCircle>
                    <div>
                        <p>Óla, <span>{userInfo.name}</span></p>
                        <Logout onClick={logoutUser} >Sair</Logout>
                    </div>
                </Profile>
            </Options>
            <LinkContainer>
                <ShoppingCart color='#fff' size={24}></ShoppingCart>
                <HeaderLink to='/carrinho'>Carrinho</HeaderLink>
            </LinkContainer>
        </Container>
    )
}