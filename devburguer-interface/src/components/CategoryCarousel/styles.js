import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
    .carousel-item {
        padding-right: 40px;
    }

    padding-left: 40px;
`;

export const ContainerItems = styled.div`
    background-color: ${({ theme }) => theme.black};
    background-image: url('${(props) => props.$imageUrl}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 20px;

    display: flex;
    align-items:center;
    padding: 20px 10px;
    width: 100%;
    height: 250px;
`;

export const Feedback = styled.p`
    text-align: center;
    padding: 40px 20px;
    font-size: 18px;
    font-weight: 600;
    color: ${({ $error, theme }) => ($error ? theme.darkRed : theme.darkGray)};
`;

export const Title = styled.h2`
    font-size: 32px;
    color: ${({ theme }) => theme.purple};
    font-weight: 800;
    padding-bottom: 12px;
    position: relative;
    text-align: center;
    margin-bottom: 40px;

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 56px;
        height: 4px;
        background: ${({ theme }) => theme.purple};
    }
`;

export const CategoryButton = styled(Link)`
    color: ${({ theme }) => theme.white};
    background-color: rgba(0,0,0,0.4);
    padding: 10px 30px;
    border-radius: 30px;
    font-size: 22.5px;
    font-weight: 500;
    margin-top: 100px;
    text-decoration: none;

    &:hover{
        background-color: ${({ theme }) => theme.purple};
    }
`;
