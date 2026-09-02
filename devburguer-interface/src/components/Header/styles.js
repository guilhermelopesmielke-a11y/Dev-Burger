import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    width: 100%;
    height: 80px;
    background-color: ${({ theme }) => theme.mainBlack};
    border-top: 2px solid ${({ theme }) => theme.purple};

    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 24px;
    padding: 0 40px;
`;

export const Navigation = styled.nav`
    margin-right: auto;

    div{
        display: flex;
        align-items: center;
        gap: 40px;

        a + a{
            position: relative;

            &::before{
                content: '';
                position: absolute;
                left: -20px;
                top: 50%;
                transform: translateY(-50%);
                width: 1px;
                height: 20px;
                background-color: ${({ theme }) => theme.darkGray};
            }
        }
    }
`;

export const Options = styled.div`
    display: flex;
    align-items: center;
`;

export const Profile = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding-right: 24px;
    border-right: 1px solid ${({ theme }) => theme.darkGray};

    div{
        display: flex;
        flex-direction: column;

        p{
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
            color: ${({ theme }) => theme.white};

            span{
                font-weight: 700;
                color: ${({ theme }) => theme.orange};
            }
        }
    }
`;

export const LinkContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const HeaderLink = styled(Link)`
    font-size: 16px;
    font-weight: 500;
    line-height: 100%;
    color: ${({ $isActive, theme }) => ($isActive ? theme.purple : theme.white)};
    text-decoration: none;
    padding: 8px 0 6px;
    border-bottom: 1px solid
        ${({ $isActive, theme }) => ($isActive ? theme.purple : 'transparent')};
    transition: opacity 0.2s, color 0.2s, border-color 0.2s;

    &:hover{
        opacity: 0.7;
    }
`;

export const Logout = styled.button`
    width: fit-content;
    background: none;
    border: none;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    color: ${({ theme }) => theme.darkRed};
    text-align: left;
    transition: opacity 0.2s;

    &:hover{
        opacity: 0.7;
    }
`;
