import { createGlobalStyle } from 'styled-components'
import '../css/font.css'
import '../css/reset.css'

const GlobalStyle = createGlobalStyle`
body {
  background-color: black;
  button {
    cursor: pointer;
  }
}
`

export default GlobalStyle
