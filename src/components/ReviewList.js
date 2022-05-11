import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CommentSend } from './CommentSend'
import { Comment } from './Comment'
import {
  cancelLikeWithReviewNo,
  getCommentWithReviewNo,
  sendLikeWithReviewNo,
} from '../api/axios'
import { getUserFromCookie } from '../utils/cookie'

const Review = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr 1fr;
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
  section p {
    margin-top: 10px;
    font-size: 10px;
  }
`
const ReplyAndLikes = styled.div`
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
const CommentContainer = styled.div`
  display: ${(props) => (props.displayValue ? 'block' : 'none')};
`
export const ReviewList = (props) => {
  const [showComment, setShowComment] = useState(false)
  const [comments, setComments] = useState([])
  const [likePressed, setLikePressed] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getComment()
    checkLikePressed()
  }, [])
  async function getComment() {
    const { data } = await getCommentWithReviewNo(props.data.no)
    setComments(data.comments)
  }
  async function checkLikePressed() {
    const user = await JSON.parse(getUserFromCookie())
    if (props.data.likes.includes(user.id)) {
      setLikePressed(true)
    }
  }
  function handleChangeShowComment() {
    setShowComment((Prev) => !Prev)
  }
  async function handleSendLike() {
    const { data } = await sendLikeWithReviewNo(props.data.no)
    if (data.message === 'ok') {
      alert('좋아요가 반영되었습니다.')
    }
    navigate(0)
  }
  async function handleCancelLike() {
    const { data } = await cancelLikeWithReviewNo(props.data.no)
    if (data.message === 'ok') {
      alert('좋아요가 취소되었습니다.')
    }
    navigate(0)
  }
  console.log(props.data)
  return (
    <>
      <Review>
        <User>
          <section>
            <span>{props.data.user.nickName}</span>
            <span>⭐&nbsp;&nbsp;{props.data.ratings}</span>
            <p>📆{props.data.createdAt}</p>
          </section>
        </User>
        <ReplyAndLikes>
          <span>
            ❤️{props.data.likes.length === 0 ? 0 : props.data.likes.length}
          </span>
          <span>💬 {comments.length}</span>
        </ReplyAndLikes>
        <Btn>
          {likePressed ? (
            <button onClick={handleCancelLike}>좋아요 취소</button>
          ) : (
            <button onClick={handleSendLike}>좋아요</button>
          )}
          <button onClick={handleChangeShowComment}>
            댓글({comments.length})
          </button>
        </Btn>
      </Review>
      <CommentContainer displayValue={showComment}>
        <CommentSend reviewId={props.data.no}></CommentSend>
        {comments
          ? comments.map((comment) => {
              return <Comment data={comment} key={comment.no}></Comment>
            })
          : ''}
      </CommentContainer>
    </>
  )
}
