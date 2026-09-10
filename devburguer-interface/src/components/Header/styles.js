import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    width: 100%;
    height: 80px;
    background-color: ${({ theme }) => theme.mainBlack};
    border-top: 2px solid ${({ theme }) => theme.purple};

    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 24px;
    padding: 0 40px;
`;

export const Navigation = styled.nav`
    margin-right: auto;

    div{
        display: flex;
        align-items: center;
        gap: 40px;

        a + a{
            position: relative;

            &::before{
                content: '';
                position: absolute;
                left: -20px;
                top: 50%;
                transform: translateY(-50%);
                width: 1px;
                height: 20px;
                background-color: ${({ theme }) => theme.darkGray};
            }
        }
    }
`;

export const Options = styled.div`
    display: flex;
    align-items: center;
`;

export const Profile = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding-right: 24px;
    border-right: 1px solid ${({ theme }) => theme.darkGray};

    div{
        display: flex;
        flex-direction: column;

        p{
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
            color: ${({ theme }) => theme.white};

            span{
                font-weight: 700;
                color: ${({ theme }) => theme.orange};
            }
        }
    }
`;

// O tranco de chegada: o carrinho "recebe" o produto crescendo e balancando,
// que e o que fecha o ciclo iniciado no clique do card.
const cartBump = keyframes`
    0% {
        transform: scale(1) rotate(0deg);
    }
    30% {
        transform: scale(1.4) rotate(-12deg);
    }
    55% {
        transform: scale(0.9) rotate(7deg);
    }
    100% {
        transform: scale(1) rotate(0deg);
    }
`;

// Alvo do voo: existe so para dar um no estavel ao `getBoundingClientRect`,
// enquanto o filho remonta a cada chegada para reiniciar a animacao.
export const CartTarget = styled.span`
    display: inline-flex;
`;

export const CartPulse = styled.span`
    display: inline-flex;

    ${({ $isActive }) =>
        $isActive &&
        css`
            animation: ${cartBump} 550ms cubic-bezier(0.34, 1.56, 0.64, 1);
        `}

    @media (prefers-reduced-motion: reduce) {
        animation: none;
    }
`;

export const LinkContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const HeaderLink = styled(Link)`
    font-size: 16px;
    font-weight: 500;
    line-height: 100%;
    color: ${({ $isActive, theme }) => ($isActive ? theme.purple : theme.white)};
    text-decoration: none;
    padding: 8px 0 6px;
    border-bottom: 1px solid
        ${({ $isActive, theme }) => ($isActive ? theme.purple : 'transparent')};
    transition: opacity 0.2s, color 0.2s, border-color 0.2s;

    &:hover{
        opacity: 0.7;
    }
`;

export const Logout = styled.button`
    width: fit-content;
    background: none;
    border: none;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    color: ${({ theme }) => theme.darkRed};
    text-align: left;
    transition: opacity 0.2s;

    &:hover{
        opacity: 0.7;
    }
`;
