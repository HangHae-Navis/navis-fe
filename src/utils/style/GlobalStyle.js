import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-size: 10px;
        list-style: none;
        text-decoration: none;
    }

    input {
        &:foucs {
            outline: none;
        
        }
    }
`;

export default GlobalStyle;
