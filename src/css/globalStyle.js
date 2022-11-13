import { createGlobalStyle } from 'styled-components'
import '../css/font.css'
import '../css/reset.css'

const GlobalStyle = createGlobalStyle`
:root{
  --swiper-navigation-color:#f21b75;
  --swiper-navigation-size:66px;
  // swiper navigation arrow 커스텀
}
body {
  background-color: black;
  button {
    cursor: pointer;
  }
}
`

export default GlobalStyle
