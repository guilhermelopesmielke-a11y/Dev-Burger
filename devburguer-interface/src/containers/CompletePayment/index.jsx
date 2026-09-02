import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { useCart } from '../../hooks/CartContext'
import { api } from '../../services/api'
import { Card, Container, HomeButton, Message, Title } from './styles'

// Pix nao confirma na hora: o cliente ainda vai abrir o app do banco. Em vez de
// mostrar "pendente" e exigir F5, consultamos por ate ~1 minuto.
const POLL_INTERVAL_MS = 3000
const MAX_ATTEMPTS = 20

const CONTENT = {
    loading: {
        title: 'Confirmando pagamento...',
        message: 'Só um instante, estamos verificando com o Stripe.',
    },
    paid: {
        title: 'Pagamento aprovado!',
        message: 'Seu pedido já foi enviado para a cozinha. Bom apetite!',
    },
    pending: {
        title: 'Aguardando o pagamento',
        message:
            'Assim que o Pix for compensado, seu pedido entra na fila automaticamente. Você pode fechar esta página.',
    },
    expired: {
        title: 'O pagamento expirou',
        message: 'O prazo do Pix acabou e a cobrança foi cancelada. Monte o pedido de novo para tentar outra vez.',
    },
    error: {
        title: 'Não foi possível verificar',
        message: 'Falha ao consultar o status do pagamento. Tente novamente em instantes.',
    },
    missing: {
        title: 'Pagamento não encontrado',
        message: 'Não recebemos a identificação da compra. Faça o pedido novamente.',
    },
}

export function CompletePayment() {

    const [searchParams] = useSearchParams()
    const { state } = useLocation()
    const navigate = useNavigate()
    const { clearCart } = useCart()

    // Vem no state quando o cliente pagou sem sair da pagina (cartao) e na query
    // string quando o Stripe redirecionou de volta pelo return_url (Pix).
    const sessionId = state?.sessionId ?? searchParams.get('session_id')

    const [status, setStatus] = useState(sessionId ? 'loading' : 'missing')

    // clearCart e recriado a cada render no CartContext. Numa dependencia de
    // efeito isso reiniciaria o polling infinitamente, entao guardamos a versao
    // mais recente numa ref.
    const clearCartRef = useRef(clearCart)

    useEffect(() => {
        clearCartRef.current = clearCart
    })

    useEffect(() => {
        if (!sessionId) {
            return
        }

        let attempts = 0
        let timeoutId
        let cancelled = false

        const check = async () => {
            try {
                const { data } = await api.get('/session-status', {
                    params: { session_id: sessionId },
                })

                if (cancelled) {
                    return
                }

                if (data.payment_status === 'paid') {
                    setStatus('paid')
                    clearCartRef.current()
                    return
                }

                if (data.status === 'expired') {
                    setStatus('expired')
                    return
                }

                attempts += 1

                if (attempts >= MAX_ATTEMPTS) {
                    setStatus('pending')
                    return
                }

                timeoutId = setTimeout(check, POLL_INTERVAL_MS)
            } catch {
                if (!cancelled) {
                    setStatus('error')
                }
            }
        }

        check()

        return () => {
            cancelled = true
            clearTimeout(timeoutId)
        }
    }, [sessionId])

    const { title, message } = CONTENT[status]

    return (
        <Container>
            <Card>
                <Title $status={status}>{title}</Title>
                <Message>{message}</Message>
                <HomeButton onClick={() => navigate('/home')}>
                    Voltar para o início
                </HomeButton>
            </Card>
        </Container>
    )
}
