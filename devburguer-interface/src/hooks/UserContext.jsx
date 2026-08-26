import { useContext, useState, useEffect, createContext } from "react";

/*
  PASSO 3 DO FLUXO — a "caixa de dados" global do usuário.

  A Context API tem 3 peças. Pense num Wi-Fi:
    1. createContext()  -> cria a rede
    2. <Provider>       -> o roteador ligado, transmitindo o sinal
    3. useContext()     -> o aparelho que sintoniza e lê os dados
*/

// 1) Cria o canal por onde os dados vão trafegar.
//    O {} é o valor padrão, usado só se alguém tentar ler o contexto
//    estando FORA do Provider.
const UserContext = createContext({})

// 2) O Provider: é ele quem guarda o estado e distribui para a árvore toda.
export const UserProvider = ({children}) =>{

    // Memória do React: guarda o usuário logado enquanto a página está aberta.
    // Ao dar F5 isso zera — por isso também salvamos no localStorage abaixo.
    const [userInfo, setUserInfo] = useState({})

    // Chamada pelo Login depois que o back-end autentica (ver PASSO 4).
    // Salva em DOIS lugares, cada um com um papel diferente:
    const putUserData = (userInfo) =>{
        setUserInfo(userInfo) // (a) no React -> a tela re-renderiza na hora

        // (b) no navegador -> sobrevive ao F5 e a fechar o navegador.
        //     Precisa de JSON.stringify porque o localStorage só guarda TEXTO,
        //     nunca objeto.
        localStorage.setItem('devburger:userData',JSON.stringify(userInfo))
    }

    // Sair da conta: limpa os dois lugares, na ordem inversa do putUserData.
    const logout = () =>{
        localStorage.removeItem('devburger:userData')
        setUserInfo({})
    }

    // A ponte localStorage -> React.
    // O array vazio [] no final significa "rode só UMA vez, quando o app abrir".
    // É exatamente isto que faz o usuário continuar logado depois do F5.
    useEffect(() =>{
        const userInfoLocalStorage = localStorage.getItem('devburger:userData')

        // ATENÇÃO / BUG: a condição está testando 'userInfo' (o state, que vale {}
        // e portanto é SEMPRE verdadeiro) em vez de 'userInfoLocalStorage'.
        // Se não houver nada salvo, JSON.parse(null) devolve null e o state
        // vira null. O certo seria: if (userInfoLocalStorage)
        if(userInfoLocalStorage){
            // JSON.parse desfaz o stringify: transforma o texto de volta em objeto.
            setUserInfo(JSON.parse(userInfoLocalStorage))
        }
    },[])

    return(
        // A prop 'value' é o que efetivamente é transmitido pela antena.
        // Sem ela, o roteador está ligado mas não transmite nada.
        //
        // ATENÇÃO / BUG: 'value={userInfo, logout}' NÃO cria um objeto — isso é o
        // operador vírgula do JavaScript, que descarta o userInfo e envia só a
        // função logout. Além disso o putUserData nem está sendo enviado, e o
        // Login precisa dele. O correto é um OBJETO, com chaves duplas:
        //     value={{ userInfo, putUserData, logout }}
        <UserContext.Provider value={{userInfo,putUserData, logout}}>
            {children}
        </UserContext.Provider>
    )
}

// 3) Hook customizado: o atalho que os componentes usam para ler o contexto.
//    "Hook customizado" = função comum que começa com 'use' e usa outros hooks
//    por dentro. Não tem mágica nenhuma.
//
//    Sem ele, cada componente teria que importar useContext + UserContext e
//    escrever useContext(UserContext). Com ele, basta:
//        const { userInfo } = useUser()
export const useUser = () =>{
    const context = useContext(UserContext) // sintoniza na antena

    // Rede de segurança: se o componente estiver fora do Provider, o contexto
    // vem vazio. Esta mensagem clara evita um "undefined" confuso lá na frente.
    if(!context){
        throw new Error('useUser must be a valid context')
    }

    return context
}
