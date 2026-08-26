import styled, { keyframes } from "styled-components";
import BannerHamburger from "../../assets/BannerHamburger.svg";
import background from '../../assets/background.svg';
import { Link } from "react-router-dom";

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #f0f0f0;

    background-image: linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${background});

`;

export const Banner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 480px;
    width: 100%;
    position: relative;

    background: url(${BannerHamburger}) no-repeat;
    background-size: cover;
    background-position: center;
    background-color: #1f1f1f;

    h1{
        font-family: 'Road Rage', sans-serif;
        font-size: 80px;
        line-height: 60px;
        position: absolute;
        color: #fff;
        text-align: center;
        right: 20%;
        top: 30%;

        span{
            display: block;
            color: #fff;
            font-size: 20px;
        }
    }
`;

export const CategoryMenu = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
    margin-top: 30px;
    position: relative;
`;

export const ProductsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 40px;
    gap: 60px;
    justify-content: center;
    max-width: 1280px;
    margin: 50px auto 0;
`;

export const CategoryButton = styled(Link)`
    text-decoration: none;
    font-size: 20px;
    cursor: pointer;
    background: none;
    color: ${ props => props.$isActiveCategory ? `#9758a6`: `#696969`};
    font-weight: 500;
    padding-bottom: 5px;
    border: none;
    border-bottom: ${ props => props.$isActiveCategory && `3px solid #9758a6`};
    line-height: 20px;
`

const slideIn = keyframes`
    from{
        opacity: 0;
        transform: translateX(-25px);
    }
    to{
        opacity: 1;
        transform: translateX(0);
    }
`

export const BackButton = styled(Link)`
    /* fora do fluxo do flex: cola na esquerda sem empurrar as categorias */
    position: absolute;
    left: 40px;

    display: inline-flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;

    text-decoration: none;
    font-size: 20px;
    cursor: pointer;
    color: #fff;
    background-color: #9758a6;
    font-weight: 600;
    line-height: 20px;

    padding: 12px 24px;
    border: 2px solid transparent;
    border-radius: 30px;
    box-shadow: 0px 4px 12px rgba(151, 88, 166, 0.35);

    animation: ${slideIn} 0.5s ease-out;
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

    &:hover{
        border-color: #fff;
        transform: translateY(-3px);
        box-shadow: 0px 8px 18px rgba(151, 88, 166, 0.5);
    }

    &:active{
        transform: translateY(-1px) scale(0.97);
        box-shadow: 0px 3px 8px rgba(151, 88, 166, 0.4);
    }

    &:focus-visible{
        outline: 3px solid #ff8c05;
        outline-offset: 3px;
    }
`