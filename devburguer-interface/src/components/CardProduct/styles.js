import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.white};
    cursor:grab;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.35);
    position: relative;

    div{
        width: 100%;
        height: 80px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        p{
            font-size: 18px;
            color: ${({ theme }) => theme.orange};
            line-height: 20px;
            font-weight: 700;
            margin-top: 40px;
        }

        strong{
            font-size: 22px;
            color: ${({ theme }) => theme.black};
            font-weight: 800;
            line-height: 20px;
        }
    }
`;

export const CardImage = styled.img`
    height: 100px;
    position: absolute;
    top: -50px;

`;
