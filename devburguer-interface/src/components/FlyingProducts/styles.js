import styled, { keyframes } from 'styled-components';

// O voo e montado em tres camadas porque cada parte do movimento precisa da
// propria curva de tempo. Num elemento so, o `transform` seria unico e todas as
// propriedades teriam de compartilhar a mesma aceleracao — foi o que fez a
// primeira versao encolher o produto ate virar um ponto logo no inicio.
//
// Camada 1 (X) sai devagar e camada 2 (Y) desacelera: a soma vira o arco que
// sobe primeiro e so depois varre ate o carrinho. A camada 3 cuida do encolher.
//
// O X tambem freia no fim de proposito. Com uma curva so de aceleracao, o
// ultimo terco da distancia era percorrido nos ultimos milissegundos — e como o
// clone e removido no `animationend`, que dispara antes do frame final ser
// pintado, o produto sumia dezenas de pixels antes do carrinho.
const travelX = keyframes`
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(var(--flight-delta-x));
    }
`;

const travelY = keyframes`
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(var(--flight-delta-y));
    }
`;

// O quadro de 12% e o "pulo" para fora do card; o de 70% segura o produto num
// tamanho ainda legivel durante quase todo o trajeto, deixando o desaparecer
// para o trecho final, ja em cima do icone.
const shrinkAway = keyframes`
    0% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
    }
    12% {
        transform: scale(1.15) rotate(-6deg);
    }
    70% {
        transform: scale(0.55) rotate(18deg);
        opacity: 1;
    }
    100% {
        transform: scale(0.18) rotate(28deg);
        opacity: 0;
    }
`;

// As posicoes chegam como custom properties porque so o JS sabe onde o card e o
// carrinho estao na tela no momento do clique.
export const FlightPath = styled.div`
    position: fixed;
    left: var(--flight-start-x);
    top: var(--flight-start-y);
    width: var(--flight-size);
    height: var(--flight-size);
    z-index: 1200;
    pointer-events: none;
    will-change: transform;
    animation: ${travelX} var(--flight-duration) cubic-bezier(0.42, 0, 0.3, 1)
        forwards;
`;

export const FlightArc = styled.div`
    width: 100%;
    height: 100%;
    will-change: transform;
    animation: ${travelY} var(--flight-duration) cubic-bezier(0.15, 0.75, 0.4, 1)
        forwards;
`;

export const FlightImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.4);
    will-change: transform, opacity;
    animation: ${shrinkAway} var(--flight-duration) ease-in forwards;
`;
