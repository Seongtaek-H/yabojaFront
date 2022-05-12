import styled from 'styled-components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  deleteCommentWithComentId,
  updateCommentWithCommentId,
} from '../api/axios'

const StyledTextarea = styled.div`
  margin-top: 5px;
  background-color: #171721;
  border-radius: 10px;
  width: 40vw;
  height: 10vh;
  padding: 20px;
  align-items: center;
  display: flex;
  span {
    font-weight: 800;
    margin-right: 2rem;
  }
  p {
    margin-right: 2rem;
  }
  button {
    background-color: gray;
    cursor: pointer;
    margin-left: 1rem;
  }
  div {
    display: flex;
  }
`
export const Comment = (props) => {
  const [newComment, setNewComment] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const navigate = useNavigate()

  let commentObj = {
    contents: newComment,
  }

  async function handleUpdateComment() {
    const { data } = await updateCommentWithCommentId(props.data.no, commentObj)
    if (data.message === 'ok') {
      alert('댓글이 수정되었습니다.')
      navigate(0)
    }
  }
  async function handleDeleteComment() {
    const { data } = await deleteCommentWithComentId(props.data.no)
    if (data.message === 'ok') {
      alert('댓글이 삭제되었습니다.')
      navigate(0)
    }
  }
  function handleChangeIsUpdating() {
    setIsUpdating((prev) => !prev)
  }
  return (
    <StyledTextarea>
      <span>내 아이디 </span>
      {!isUpdating ? (
        <p>{props.data.contents}</p>
      ) : (
        <input
          placeholder={props.data.contents}
          onChange={(e) => {
            setNewComment(e.target.value)
          }}
        ></input>
      )}
      <div>
        {!isUpdating ? (
          <>
            <button onClick={handleChangeIsUpdating}>댓글 수정</button>
            <button onClick={handleDeleteComment}>댓글 삭제</button>
          </>
        ) : (
          <>
            <button onClick={handleUpdateComment}>작성 완료</button>
            <button onClick={handleChangeIsUpdating}>수정 취소</button>
          </>
        )}
      </div>
    </StyledTextarea>
  )
}
