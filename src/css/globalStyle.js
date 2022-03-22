import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
    background-color: black;
    color: white;
  }
  p{
    margin: 0;
  }
  button {
    background-color: transparent;
    border : 0;
    color : white;
    cursor: pointer;
  }
`

export default GlobalStyle
