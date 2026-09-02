import styled from 'styled-components';

export const ProductImage = styled.img`
    height: 80px;
    width: 80px;
    border-radius: 16px;
`;

export const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        width: 30px;
        color: ${({ theme }) => theme.white};
        border-radius: 4px;
        background-color: ${({ theme }) => theme.purple};
        transition: all 0.4s;
        border: none;

        &:hover {
            background-color: ${({ theme }) => theme.secondDarkPurple};
        }
    }
`;

export const EmptyCart = styled.p`
    font-size: 20px;
    text-align: center;
    font-weight: bold;
`;
