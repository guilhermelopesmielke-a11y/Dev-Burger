import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

const globalStyle = createGlobalStyle`
    *{
        font-family: ${({ theme }) => theme.poppinsFont};
        font-weight: 400;
        font-style: normal;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
    }

    button, a{
        cursor: pointer;
    }
`;

export default globalStyle;
