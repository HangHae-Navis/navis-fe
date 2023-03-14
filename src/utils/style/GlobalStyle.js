import { createGlobalStyle } from "styled-components";
import { Input } from "./mixins";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-size: 10px;
        list-style: none;
        text-decoration: none;
        font-family: Pretendard;
    }

    input {
        ${Input}
    }    
`;

export default GlobalStyle;
