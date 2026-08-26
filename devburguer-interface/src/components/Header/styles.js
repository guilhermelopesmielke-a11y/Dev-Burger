import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    width: 100%;
    height: 80px;
    background-color: #1f1f1f;
    border-top: 2px solid #9758a6;

    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 24px;
    padding: 0 40px;
`

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
                background-color: #696969;
            }
        }
    }
`

export const Options = styled.div`
    display: flex;
    align-items: center;
`

export const Profile = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding-right: 24px;
    border-right: 1px solid #5c5c5c;

    div{
        display: flex;
        flex-direction: column;

        p{
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
            color: #ffffff;

            span{
                font-weight: 700;
                color: #ff8c05;
            }
        }
    }
`

export const LinkContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`

export const HeaderLink = styled(Link)`
    font-size: 16px;
    font-weight: 500;
    line-height: 100%;
    color: ${ props => props.$isActive ? `#9758a6`: `#ffffff`};
    text-decoration: none;
    padding: 8px 0 6px;
    border-bottom: 1px solid ${ props => props.$isActive ? `#9758a6`: `transparent`};
    transition: opacity 0.2s, color 0.2s, border-color 0.2s;

    &:hover{
        opacity: 0.7;
    }
`

export const Logout = styled.button`
    width: fit-content;
    background: none;
    border: none;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    color: #cf3057;
    text-align: left;
    transition: opacity 0.2s;

    &:hover{
        opacity: 0.7;
    }
`
