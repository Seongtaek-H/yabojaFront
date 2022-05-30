import React from 'react'
import styled from 'styled-components'

const Warning = styled.div`
  display: none;
  background-color: black;
  color: white;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  justify-content: center;
  align-items: center;
  font-size: large;
  flex-direction: column;
  font-family: 'Noto700';
  @media screen and (max-width: 500px) {
    display: flex;
  }
  div {
    font-family: 'DoHyeon';
    font-size: 2.5rem;
    color: #fff;
    text-shadow: 0 0 7px #f21b75, 0 0 10px #f21b75, 0 0 20px #f21b75,
      0 0 42px #f21b75, 0 0 82px #f21b75, 0 0 92px #f21b75, 0 0 102px #f21b75,
      0 0 151px #f21b75;
  }
`

function NoMobile() {
  return (
    <Warning>
      <div>Yaboja</div>
      Only Available on Wide Screen 💻
    </Warning>
  )
}

export default NoMobile
