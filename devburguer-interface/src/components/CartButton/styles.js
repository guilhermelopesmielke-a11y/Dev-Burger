import styled, { css, keyframes } from 'styled-components';

// Squash & stretch: o botao afunda no toque e devolve com um leve exagero, que
// e o que da a sensacao de "empurrei e algo saiu dali".
const pressPop = keyframes`
    0% {
        transform: scale(1);
    }
    28% {
        transform: scale(0.92);
    }
    58% {
        transform: scale(1.06);
    }
    100% {
        transform: scale(1);
    }
`;

// O carrinho do icone acompanha o arremesso: recua, sobe e volta.
const iconToss = keyframes`
    0% {
        transform: translate(0, 0) rotate(0deg);
    }
    30% {
        transform: translate(-4px, 2px) rotate(-12deg);
    }
    60% {
        transform: translate(3px, -7px) rotate(10deg);
    }
    100% {
        transform: translate(0, 0) rotate(0deg);
    }
`;

const shine = keyframes`
    from {
        transform: translateX(-160%) skewX(-20deg);
    }
    to {
        transform: translateX(260%) skewX(-20deg);
    }
`;

export const ContainerButton = styled.button`
    background-color: ${({ theme }) => theme.purple};
    width: 100%;
    height: 52px;
    border: 0;
    border-radius: 5px;
    font-size: 30px;
    color: ${({ theme }) => theme.white};

    display: flex;
    align-items: center;
    justify-content: center;

    // O brilho e um pseudo-elemento que atravessa o botao, entao ele precisa de
    // um retangulo para varrer e de um recorte para nao vazar pelas bordas.
    position: relative;
    overflow: hidden;

    transition: background-color 0.2s, transform 0.15s;

    &:hover {
        background-color: ${({ theme }) => theme.secondDarkPurple};
    }

    &:active {
        transform: scale(0.96);
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 40%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.45),
            transparent
        );
        transform: translateX(-160%) skewX(-20deg);
    }

    img {
        // O icone anima por conta propria, entao ele precisa do proprio
        // contexto de transform em vez de herdar o do botao.
        display: block;
    }

    ${({ $isAnimating }) =>
        $isAnimating &&
        css`
            animation: ${pressPop} 520ms cubic-bezier(0.34, 1.56, 0.64, 1);

            &::after {
                animation: ${shine} 520ms ease-out;
            }

            img {
                animation: ${iconToss} 460ms cubic-bezier(0.34, 1.56, 0.64, 1);
            }
        `}

    @media (prefers-reduced-motion: reduce) {
        transition: background-color 0.2s;

        &,
        &::after,
        img {
            animation: none;
        }

        &:active {
            transform: none;
        }
    }
`;
