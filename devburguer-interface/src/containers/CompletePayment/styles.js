import styled from 'styled-components';
import Background from '../../assets/background.svg';
import { Button } from '../../components/Button';

const TITLE_COLORS = {
  paid: 'gren',
  pending: 'yellow',
  expired: 'darkRed',
  error: 'darkRed',
  missing: 'darkRed',
  loading: 'black',
};

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    padding: 40px 20px;
    background-image: linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${Background});
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    max-width: 500px;
    padding: 48px 40px;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.white};
    box-shadow: 0 2px 5px rgba(50, 50, 93, 0.1), 0 1px 1.5px rgba(0, 0, 0, 0.07);
    text-align: center;
`;

export const Title = styled.h1`
    color: ${({ $status, theme }) => theme[TITLE_COLORS[$status]] ?? theme.black};
    font-size: 28px;
    font-weight: 700;
    line-height: 130%;
`;

export const Message = styled.p`
    color: ${({ theme }) => theme.gray};
    font-size: 16px;
    line-height: 150%;
`;

export const HomeButton = styled(Button)`
    && {
        height: 52px;
        margin-top: 8px;
        font-family: ${({ theme }) => theme.poppinsFont};
        font-size: 16px;
        font-weight: 700;
    }
`;
