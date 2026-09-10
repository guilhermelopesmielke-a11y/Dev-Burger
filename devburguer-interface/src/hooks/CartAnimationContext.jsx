import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { FlyingProducts } from '../components/FlyingProducts';

const CartAnimationContext = createContext({});

// A duracao vive aqui e desce para o CSS como custom property, mas quem apaga o
// clone e o `animationend` dele: um `setTimeout` com esse mesmo numero dispara
// alguns milissegundos cedo demais (a animacao so comeca no frame seguinte ao
// render) e o produto sumia da tela ainda visivel, com um pisca no fim do voo.
const FLIGHT_DURATION = 750;

const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const CartAnimationProvider = ({ children }) => {
    const [flights, setFlights] = useState([]);
    const [cartPulseKey, setCartPulseKey] = useState(0);

    const cartTargetRef = useRef(null);
    const lastFlightId = useRef(0);

    // O Header registra o proprio no do icone. Guardamos o elemento, e nao a
    // posicao dele, porque o retangulo muda a cada scroll ou resize e so vale
    // medir na hora do clique.
    const registerCartTarget = useCallback((element) => {
        cartTargetRef.current = element;
    }, []);

    const flyToCart = useCallback((originElement, imageUrl) => {
        const target = cartTargetRef.current;

        // Sem origem, sem destino (as paginas do admin nao tem Header) ou com o
        // usuario pedindo menos movimento, o produto entra no carrinho do mesmo
        // jeito: a animacao e enfeite, nunca pre-requisito.
        if (!originElement || !target || prefersReducedMotion()) {
            return;
        }

        const origin = originElement.getBoundingClientRect();
        const destination = target.getBoundingClientRect();

        const id = lastFlightId.current + 1;
        lastFlightId.current = id;

        // Os deltas sao medidos de centro a centro para o clone pousar em cima
        // do icone mesmo terminando num tamanho bem diferente dele.
        setFlights((current) => [
            ...current,
            {
                id,
                imageUrl,
                startX: origin.left,
                startY: origin.top,
                size: origin.width,
                deltaX:
                    destination.left +
                    destination.width / 2 -
                    (origin.left + origin.width / 2),
                deltaY:
                    destination.top +
                    destination.height / 2 -
                    (origin.top + origin.height / 2),
            },
        ]);
    }, []);

    const handleFlightEnd = useCallback((flightId) => {
        setFlights((current) => current.filter((flight) => flight.id !== flightId));
        // O tranco do icone so acontece quando o produto chega: reagir antes
        // seria a consequencia aparecendo na frente da causa.
        setCartPulseKey((key) => key + 1);
    }, []);

    return (
        <CartAnimationContext.Provider
            value={{ flyToCart, registerCartTarget, cartPulseKey }}
        >
            {children}
            <FlyingProducts
                flights={flights}
                duration={FLIGHT_DURATION}
                onFlightEnd={handleFlightEnd}
            />
        </CartAnimationContext.Provider>
    );
};

export const useCartAnimation = () => {
    const context = useContext(CartAnimationContext);

    if (!context) {
        throw new Error('useCartAnimation must be a valid context');
    }

    return context;
};
