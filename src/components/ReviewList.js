import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { deleteReview, like } from '../api/axios'
import { getAuthFromCookie, getUserFromCookie } from '../utils/cookie'
import ReviewModal from './ReviewModal'
import Modal from 'react-modal/lib/components/Modal'
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
  width: 100%;
  display: grid;
  grid-template-columns: 8fr 1fr 1fr;
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
const Content = styled.div`
  display: flex;
  height: 50%;
  justify-content: center;
  align-items: center;
  margin: 10px;
`
const Delete = styled.div`
  margin-left: 5px;
  display: flex;
  background-color: gray;
  width: 50px;
  height: 70%;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
const CommentContainer = styled.div`
  display: ${(props) => (props.displayValue ? 'block' : 'none')};
`
export const ReviewList = (props) => {
  const [userData, setUserData] = useState('')
  const [display, setDisplay] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)

  const onClick = () => {
    setDisplay((Prev) => !Prev)
  }

  const onClickRevise = () => {
    setShowReviewModal((Prev) => !Prev)
  }
  const onClickReviewDelete = async (reviewNo) => {
    const res = await deleteReview(reviewNo)
    if (res.status === 200) {
      window.location.reload()
    } else {
      alert(res.data.message)
    }
  }

  const onClickLike = async () => {
    const res = await like()
    console.log(res)
  }

  useEffect(() => {
    setUserData(JSON.parse(getUserFromCookie()))
  }, [])
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
          <></>
          {userData.nickName === props.data.user.nickName ? (
            <>
              <Delete
                onClick={() => {
                  onClickRevise()
                }}
              >
                수정
              </Delete>
              <Delete
                onClick={() => {
                  onClickReviewDelete(props.data.no)
                }}
              >
                삭제
              </Delete>
            </>
          ) : (
            ''
          )}
        </User>
        <Content>{props.data.contents}</Content>
        <Reply>
          <span>❤️ {props.data.likes}</span>
          <span>💬 0</span>
        </Reply>
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
      <Modal
        isOpen={showReviewModal}
        onRequestClose={() => {
          setShowReviewModal(false)
        }}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            zIndex: 3,
          },
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '65vw',
            height: '60vh',
            border: '1px solid #ccc',
            background: '#212529',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '10px',
            outline: 'none',
          },
        }}
      >
        <ReviewModal
          showReviewModal
          poster={props.poster}
          revise={true}
          contents={props.data.contents}
          ratings={props.data.ratings}
          reviewNo={props.data.no}
        ></ReviewModal>
      </Modal>
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
