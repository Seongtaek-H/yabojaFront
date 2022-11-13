import styled from 'styled-components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  deleteCommentWithComentId,
  updateCommentWithCommentId,
} from '../api/axios'

const StyledTextarea = styled.div`
  margin-top: 10px;
  background-color: #171721;
  border-radius: 10px;
  width: 800px;
  padding: 20px;
  display: grid;
  align-items: center;
  grid-template-columns: max-content auto max-content;

  span {
    font-weight: 800;
    margin-right: 1rem;
  }
  button {
    background-color: gray;
    cursor: pointer;
    padding: 1rem;
    border-radius: 1rem;
  }
  button:nth-child(1) {
    margin: 0 1rem;
  }
  div {
    display: flex;
  }
`
export const Comment = (props) => {
  const [newComment, setNewComment] = useState(props.data.contents)
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
      <span> {props.data.user.name} </span>
      {!isUpdating ? (
        <p>{props.data.contents}</p>
      ) : (
        <input
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value)
          }}
        ></input>
      )}
      <div>
        {!isUpdating ? (
          <>
            <button onClick={handleChangeIsUpdating}>
              {' '}
              <i className="fa-solid fa-pencil"></i>
            </button>
            <button onClick={handleDeleteComment}>
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </>
        ) : (
          <>
            <button onClick={handleUpdateComment}>
              {' '}
              <i className="fa-solid fa-check"></i>
            </button>
            <button onClick={handleChangeIsUpdating}>
              <i className="fa-solid fa-x"></i>
            </button>
          </>
        )}
      </div>
    </StyledTextarea>
  )
}
