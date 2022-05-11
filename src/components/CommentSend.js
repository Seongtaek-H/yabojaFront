import { useState } from 'react'
import styled from 'styled-components'
import { createComment } from '../api/axios'

const StyledTextarea = styled.div`
  margin-top: 5px;
  background-color: #171721;
  border-radius: 10px;
  width: 40vw;
  height: 10vh;
  padding: 20px;
  align-items: center;
  display: flex;
  input {
    all: unset;
    margin-left: 30px;
    width: 80%;
    height: 100%;
    border-bottom: 1px gray solid;
  }
  button {
    background-color: gray;
    cursor: pointer;
  }
`
export const CommentSend = (props) => {
  const [reply, setReply] = useState('')
  let comment = {
    contents: reply,
    reviewNo: parseInt(props.reviewId),
  }
  async function handleSendComment() {
    const response = await createComment(comment)
    console.log(response)
  }
  return (
    // <StyledTextarea displayOn={display}>
    <StyledTextarea>
      <span>↳ 내 아이디 </span>
      <input
        type="textarea"
        placeholder="댓글을 달아주세요"
        onChange={(e) => {
          setReply(e.target.value)
        }}
      ></input>
      <button onClick={handleSendComment}>댓글 전송</button>
    </StyledTextarea>
  )
}
