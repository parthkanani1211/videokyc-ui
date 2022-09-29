import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  a:hover {
    color: inherit;
    text-decoration: none;
  }
  * {
    box-sizing: border-box;
  }
  @media screen and (max-width: 600px){
    .ReactModal__Content {
      max-width: 90vw !important;
    }
  }
`;
