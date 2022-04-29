import styled from 'styled-components'
import { useState } from 'react'

const Review = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr 1fr 1fr;
  background-color: #212529;
  border-radius: 10px;
  width: 40vw;
  height: 20vh;
  margin-top: 3vw;
  padding: 10px;
`
const User = styled.div`
  display: flex;
  justify-content: space-between;
  section span:nth-child(2) {
    border: 1px gray solid;
    margin-left: 10px;
    padding: 5px;
    border-radius: 5px;
  }
`

const Content = styled.div`
  display: flex;
  height: 50%;
  justify-content: center;
  align-items: center;
`
const Reply = styled.div`
  border-bottom: 1px gray solid;
  span:nth-child(2) {
    margin-left: 10px;
  }
`
const Btn = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 10px;
  button {
    all: unset;
    width: 100%;
    cursor: pointer;
    text-align: center;
  }

  button:nth-child(2) {
    border-left: 1px gray solid;
  }
`
const StyledTextarea = styled.div`
  margin-top: 5px;
  background-color: #171721;
  border-radius: 10px;
  width: 40vw;
  height: 10vh;
  padding: 20px;
  align-items: center;
  display: ${(props) => (props.display ? 'flex' : 'none')};
  input {
    all: unset;
    margin-left: 30px;
    width: 80%;
    height: 100%;
    border-bottom: 1px gray solid;
  }
`
export const ReviewList = (props) => {
  const [display, setDisplay] = useState(false)
  const onClick = () => {
    setDisplay((Prev) => !Prev)
  }
  return (
    <>
      <Review>
        <User>
          <section>
            <span>{props.data.user.nickName}</span>
            <span>⭐&nbsp;&nbsp;{props.data.ratings}</span>
          </section>
          <span>📆{props.data.createAt}</span>
        </User>
        <Content>{props.data.contents}</Content>
        <Reply>
          <span>❤️{props.data.likes}</span>
          <span>💬 0</span>
        </Reply>
        <Btn>
          <button>좋아요</button>
          <button onClick={onClick}>댓글달기</button>
        </Btn>
      </Review>
      <StyledTextarea display={display}>
        <span>↳ 내 아이디</span>
        <input type="textarea" placeholder="댓글을 달아주세요"></input>
      </StyledTextarea>
    </>
  )
}
