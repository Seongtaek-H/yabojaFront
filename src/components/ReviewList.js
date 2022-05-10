import styled from 'styled-components'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Comment } from './Comment'

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
`
const Delete = styled.div`
  display: flex;
  background-color: gray;
  width: 10%;
  height: 70%;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
export const ReviewList = (props) => {
  let navigate = useNavigate()

  const [display, setDisplay] = useState(false)
  const [reviseModal, setReviseModal] = useState(false)
  const onClick = () => {
    setDisplay((Prev) => !Prev)
  }

  // const deleteReview = async (id) => {
  //   const res = await apiAxios.delete(`/review/${id}`)
  //   alert('삭제되었습니다.')
  //   navigate('/')
  // }

  // console.log(props.data.user.nickName)
  return (
    <>
      <Review>
        <User>
          <section>
            <span>{props.data.user.nickName}</span>
            <span>⭐&nbsp;&nbsp;{props.data.ratings}</span>
            <p>📆{props.data.createdAt}</p>
          </section>
          {/* {state.nickName === props.data.user.nickName ? (
            <Delete>삭제</Delete>
          ) : (
            ''
          )} */}
        </User>
        {!reviseModal ? (
          <Content>{props.data.contents}</Content>
        ) : (
          <input value={props.data.contents}></input>
        )}

        <ReplyAndLikes>
          <span>❤️{props.data.likes}</span>
          <span>💬 0</span>
        </ReplyAndLikes>
        <Btn>
          <button>좋아요</button>
          <button onClick={onClick}>댓글달기</button>
        </Btn>
      </Review>
      <Comment reviewId={props.data.no}></Comment>
    </>
  )
}
