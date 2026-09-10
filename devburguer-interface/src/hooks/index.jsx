import {UserProvider} from './UserContext'
import {CartProvider} from './CartContext'
import {CartAnimationProvider} from './CartAnimationContext'

/*
  PASSO 2 DO FLUXO — o "agregador de Providers".

  Este arquivo não tem lógica nenhuma: ele só empilha os contextos num lugar só.
*/
const AppProvider = ({children}) =>{

    // 'children' é uma prop automática do React: ela representa tudo que foi
    // escrito ENTRE as tags <AppProvider> ... </AppProvider> lá no main.jsx.
    // Repassar {children} para dentro é o que mantém o app inteiro sendo renderizado.
    return(
        <UserProvider>
            <CartProvider>
                <CartAnimationProvider>{children}</CartAnimationProvider>
            </CartProvider>
        </UserProvider>
    )
}

export default AppProvider
