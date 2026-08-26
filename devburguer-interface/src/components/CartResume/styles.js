import styled from "styled-components";
import { Button } from "../Button";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 26px;
`

export const ResumeCard = styled.div`
    display: flex;
    flex-direction: column;
    height: 410px;
    background-color: #fff;
    border-radius: 20px;
    overflow: hidden;
`

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background-color: #333232;
    border-radius: 20px 20px 0 0;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    line-height: 109%;
`

export const Body = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 40px;
    padding: 57px 30px 47px;
`

export const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #828282;
    font-size: 18px;
    line-height: 109%;

    span{
        font-weight: 700;
    }
`

export const TotalRow = styled(Row)`
    margin-top: auto;
    color: #000;
    font-size: 24px;

    span{
        color: #484848;
    }
`

export const FinishButton = styled(Button)`
    && {
        height: 57px;
        font-family: "Poppins", sans-serif;
        font-size: 18px;
        font-weight: 700;
    }
`
