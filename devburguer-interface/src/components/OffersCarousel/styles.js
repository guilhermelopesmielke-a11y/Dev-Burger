import styled from 'styled-components';

export const Container = styled.div`
    .carousel-item {
        padding-right: 40px;
    }

    overflow-x: hidden;

    .react-multi-carousel-list{
        overflow:visible;
    }

    padding-left: 40px;
    padding-bottom: 40px;
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
    color: ${({ theme }) => theme.gren};
    font-weight: 800;
    padding-bottom: 12px;
    position: relative;
    text-align: center;
    margin:70px 0;

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 56px;
        height: 4px;
        background: ${({ theme }) => theme.gren};
    }
`;
