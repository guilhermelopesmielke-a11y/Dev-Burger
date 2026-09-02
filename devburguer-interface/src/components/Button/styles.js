import styled from 'styled-components';

export const ContainerButton = styled.button`
    width: 100%;
    height: 52px;
    border: none;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.purple};
    color: ${({ theme }) => theme.white};
    font-family: ${({ theme }) => theme.roadRageFont};
    font-size: 30px;

    &:hover{
        background-color: ${({ theme }) => theme.secondDarkPurple};
        border: 1px solid ${({ theme }) => theme.white};
    }
`;
