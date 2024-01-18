import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }

  html, body {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  body{
    background-color: ${({ theme }) => theme.colors.background};
  }
`;
