import { Link } from "react-router-dom";
import styled from "styled-components";


export const Container = styled.div`
    .carousel-item {
        padding-right: 40px;
    }

    padding-left: 40px;
`


export const ContainerItems = styled.div`
    background-color: #3d3d3d;
    background-image: url('${props => props.$imageUrl}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 20px;

    display: flex;
    align-items:center;
    padding: 20px 10px;
    width: 100%;
    height: 250px;
`

export const Feedback = styled.p`
    text-align: center;
    padding: 40px 20px;
    font-size: 18px;
    font-weight: 600;
    color: ${props => (props.$error ? "#cf3057" : "#5c5c5c")};
`

export const Title = styled.h2`
    font-size: 32px;
    color: #9758a6;
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
        background: #9758a6;
    }
`
export const CategoryButton = styled(Link)`
    color: #ffffff;
    background-color: rgba(0,0,0,0.4);
    padding: 10px 30px;
    border-radius: 30px;
    font-size: 22.5px;
    font-weight: 500;
    margin-top: 100px;
    text-decoration: none;

    &:hover{
        background-color: #9758a6;
    }
`