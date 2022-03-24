import styled from 'styled-components'
import { keyframes } from 'styled-components'

const rotateLoading = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const LoadingIcon = styled.div`
  height: 100px;
  position: relative;
  width: 100px;
  border-radius: 100%;

  border: 2px solid transparent;
  border-color: transparent #fff transparent #fff;
  animation: ${rotateLoading} 1.5s linear 0s infinite normal;
  transform-origin: 50% 50%;
`

const LoadingContainer = styled.div`
  height: 100px;
  position: relative;
  width: 100px;
  border-radius: 100%;

  margin: 40px auto;

  ${LoadingIcon} {
    transition: all 0.5s ease-in-out;
  }

  &:hover {
    ${LoadingIcon} {
      border-color: transparent #e45635 transparent #e45635;
      transition: all 0.5s ease-in-out;
    }
  }
`
const LoadingText = styled.div`
  color: #ffffff;
  font-family: 'Helvetica Neue, ' Helvetica ', ' 'arial';
  font-size: 10px;
  font-weight: bold;
  margin-top: 45px;
  position: absolute;
  text-align: center;
  text-transform: uppercase;
  top: 0;
  width: 100px;
`

const Loading = () => {
  return (
    <Wrapper>
      <LoadingContainer>
        <LoadingIcon></LoadingIcon>
        <LoadingText>loading</LoadingText>
      </LoadingContainer>
    </Wrapper>
  )
}

export default Loading
