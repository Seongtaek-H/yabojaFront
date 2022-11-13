import { useState } from 'react'
import styled from 'styled-components'
import { createComment } from '../api/axios'
import { useNavigate } from 'react-router-dom'

const StyledTextarea = styled.div`
  margin-top: 10px;
  background-color: #171721;
  border-radius: 10px;
  width: 800px;
  padding: 20px;
  align-items: center;
  display: grid;
  grid-template-columns: max-content auto max-content;
  span {
    margin-right: 1rem;
  }
  input {
    all: unset;
    width: 100%;
    height: 100%;
    border-bottom: 1px gray solid;
  }
  button {
    margin-left: 1rem;
    background-color: gray;
    padding: 1rem;
    border-radius: 1rem;
  }
`
export const CommentSend = (props) => {
  const [reply, setReply] = useState('')
  const navigate = useNavigate()
  let comment = {
    contents: reply,
    reviewNo: parseInt(props.reviewId),
  }
  async function handleSendComment() {
    const { data } = await createComment(comment)
    if (data.message === 'ok') {
      alert('댓글이 등록되었습니다.')
      navigate(0)
    }
  }
  return (
    <StyledTextarea>
      <span>↳ {props.userData.name} </span>
      <input
        type="textarea"
        placeholder="댓글을 달아주세요"
        onChange={(e) => {
          setReply(e.target.value)
        }}
      ></input>
      <button onClick={handleSendComment}>댓글 달기</button>
    </StyledTextarea>
  )
}
