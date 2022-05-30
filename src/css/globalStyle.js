import { createGlobalStyle } from 'styled-components'
import '../css/font.css'

const GlobalStyle = createGlobalStyle`

  :root {
    --min-width: 1130px;
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    padding:0px;
    margin:0px;
    font-family: "Noto300";
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
