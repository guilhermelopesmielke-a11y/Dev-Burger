import styled from 'styled-components';
import Background from '../../assets/background.svg';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    padding: 40px 20px;
    background-image: linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${Background});
`;

export const ErrorMessage = styled.h1`
    max-width: 500px;
    color: ${({ theme }) => theme.darkRed};
    font-size: 24px;
    text-align: center;
`;
