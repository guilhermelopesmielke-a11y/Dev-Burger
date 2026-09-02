import styled from 'styled-components';
import { Button } from '../Button';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 26px;
`;

export const ResumeCard = styled.div`
    display: flex;
    flex-direction: column;
    height: 410px;
    background-color: ${({ theme }) => theme.white};
    border-radius: 20px;
    overflow: hidden;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background-color: ${({ theme }) => theme.black};
    border-radius: 20px 20px 0 0;
    color: ${({ theme }) => theme.white};
    font-size: 18px;
    font-weight: 700;
    line-height: 109%;
`;

export const Body = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 40px;
    padding: 57px 30px 47px;
`;

export const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme }) => theme.gray};
    font-size: 18px;
    line-height: 109%;

    span{
        font-weight: 700;
    }
`;

export const TotalRow = styled(Row)`
    margin-top: auto;
    color: ${({ theme }) => theme.mainBlack};
    font-size: 24px;

    span{
        color: ${({ theme }) => theme.secondBlack};
    }
`;

export const FinishButton = styled(Button)`
    && {
        height: 57px;
        font-family: ${({ theme }) => theme.poppinsFont};
        font-size: 18px;
        font-weight: 700;
    }
`;
