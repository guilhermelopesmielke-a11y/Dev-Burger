import { useRef, useState } from "react";
import Cart from "../../assets/cart.svg";
import { ContainerButton } from "./styles";

export function CartButton({ onClick, ...props }) {
    const [isAnimating, setIsAnimating] = useState(false);
    const buttonRef = useRef(null);

    function handleClick(event) {
        if (isAnimating) {
            // Um segundo clique dentro da animacao nao muda o estado (ja e
            // `true`), entao o CSS nao reiniciaria sozinho. Rebobinar na mao e o
            // que faz o botao responder a cada clique de quem pede dois iguais.
            buttonRef.current
                ?.getAnimations({ subtree: true })
                .forEach((animation) => {
                    animation.cancel();
                    animation.play();
                });
        } else {
            setIsAnimating(true);
        }

        onClick?.(event);
    }

    // O reset vem do proprio fim da animacao (e nao de um timer) para os dois
    // tempos nunca sairem de sincronia. O filtro pelo currentTarget existe
    // porque o `animationend` do icone tambem sobe ate aqui.
    function handleAnimationEnd(event) {
        if (event.target === event.currentTarget) {
            setIsAnimating(false);
        }
    }

    return (
        <ContainerButton
            {...props}
            ref={buttonRef}
            $isAnimating={isAnimating}
            onClick={handleClick}
            onAnimationEnd={handleAnimationEnd}
        >
            <img src={Cart} alt="Carrinho de compras" />
        </ContainerButton>
    )
}
