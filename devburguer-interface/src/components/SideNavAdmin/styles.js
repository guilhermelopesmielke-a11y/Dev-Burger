import styled, { css } from 'styled-components';

// Metricas do Figma (GERENCIAR 0:589 — mesma estrutura de 3 itens do navLinks):
// linha de 60px, icone a 30px da borda, texto Poppins 22px branco.
const navItem = css`
    display: flex;
    align-items: center;
    gap: 17px;
    height: 60px;
    padding-left: 30px;
    color: ${({ theme }) => theme.white};
    font-size: 22px;
    line-height: 109%;
    text-decoration: none;
    transition: background-color 0.3s ease;

    svg{
        flex-shrink: 0;
        width: 24px;
        height: 24px;
    }

    &:hover{
        background-color: ${({ theme }) => theme.secondDarkPurple};
    }
`;

export const Container = styled.aside`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.black};

    /* logo 0:635: 180px, 36px do topo, 58px ate o primeiro item */
    > img{
        width: 180px;
        margin: 36px auto 58px;
    }
`;

export const NavLinkContainer = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 40px;

    a{
        ${navItem}

        /* o NavLink do react-router aplica .active na rota atual.
           So vale aqui: o "Sair" e uma acao, nunca a pagina atual. */
        &.active{
            background-color: ${({ theme }) => theme.purple};
        }
    }
`;

export const Footer = styled.footer`
    margin-top: auto;

    a{
        ${navItem}
    }
`;
