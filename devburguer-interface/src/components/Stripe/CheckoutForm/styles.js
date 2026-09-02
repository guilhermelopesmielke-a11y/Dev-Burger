import styled, { keyframes } from "styled-components";
import { Button } from "../../Button";

export const Form = styled.form`
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 40px;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(50, 50, 93, 0.1), 0 1px 1.5px rgba(0, 0, 0, 0.07);
`

export const PayButton = styled(Button)`
    && {
        height: 57px;
        font-family: "Poppins", sans-serif;
        font-size: 18px;
        font-weight: 700;

        &:disabled{
            opacity: 0.5;
            cursor: default;
        }
    }
`

export const StatusMessage = styled.p`
    color: #696d78;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
`

const spin = keyframes`
    to{
        transform: rotate(360deg);
    }
`

export const Spinner = styled.span`
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
`
