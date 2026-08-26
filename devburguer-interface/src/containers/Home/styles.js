import styled from "styled-components";
import BackgroundHamburger from '../../assets/background-hamburguer.svg';
import background from '../../assets/background.svg';

export const Banner = styled.div`
    background-image: url(${BackgroundHamburger});
    background-size: cover;
    background-position: center;
    min-height: 45vh;
    
    h1{
        font-family: "Road Rage", sans-serif;
        font-size: 80px;
        color: #f4f4f4;
        position: absolute;
        right: 20%;
        top: 10%;
    }
`;

export const Container = styled.section`
    background-image: linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${background});
    background-size: cover;
    background-position: center;
    min-height: 55vh;
`;


