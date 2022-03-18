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
  > span {
    padding-right: 10px;
  }
  section > span {
    padding-left: 10px;
  }
`

const Content = styled.div`
  display: flex;
  height: 50%;
  justify-content: center;
  align-items: center;
`
const Reply = styled.div``
const Btn = styled.div`
  button {
    margin-right: 5px;
  }
`
const StyledTextarea = styled.div`
  margin-top: 5px;
  background-color: #171721;
  border-radius: 10px;
  width: 40vw;
  height: 5vw;
  padding: 10px;
  justify-content: center;
  display: ${(props) => (props.display ? '' : 'none')};
  input {
    margin-left: 30px;
    width: 80%;
    height: 80%;
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
            <span>{props.data.userId}</span>
            <span>⭐{props.data.star}</span>
          </section>
          <span>📆{props.data.date}</span>
        </User>
        <Content>{props.data.review}</Content>
        <Reply>
          <span>❤️{props.data.like}개</span>
          <span>💬{props.data.reply.length}</span>
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
