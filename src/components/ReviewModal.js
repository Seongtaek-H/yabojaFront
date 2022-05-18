import styled from 'styled-components'
import { memo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createReview, putReview } from '../api/axios'

const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  h1 {
    margin-top: 1.5%;
    margin-left: 2%;
  }
`
const StyledForm = styled.div`
  width: 100%;
  height: 80%;
  padding: 0px;
  margin: 0px;
  display: grid;
  grid-template-columns: 20% 80%;
  grid-template-rows: 80% 20%;
  grid-template:
    'poster input input'
    'footer footer footer';
`

const Poster = styled.div`
  width: 85%;
  height: 100%;
  background-image: url(${(props) => props.url});
  background-size: 100% 100%;
  background-position: center center;
  background-color: white;
  border-radius: 10px;
  align-self: center;
  justify-self: center;
  grid-area: poster;
`
const InputContainer = styled.div`
  width: 95%;
  height: 100%;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  p {
    font-size: 25px;
  }
  grid-area: input;
`

const Rating = styled.div`
  direction: rtl;
  text-align: left;
  margin: 2% 0;
  input[type='radio'] {
    display: none;
    &:checked ~ label {
      text-shadow: 0 0 0 orange;
    }
  }
  label {
    cursor: pointer;
    font-size: 25px;
    color: transparent;
    text-shadow: 0 0 0 #f0f0f0;
    &:hover {
      text-shadow: 0 0 0 yellow;
    }
    &:hover ~ label {
      text-shadow: 0 0 0 yellow;
    }
  }
`

const StyledInput = styled.input`
  margin-top: 5px;
  padding: 5%;
  width: 90%;
  height: 20vh;
  background-color: #171721;
  border-radius: 10px;
  color: white;
  border: none;
  :focus {
    outline: none;
  }
`

const StyledBtn = styled.button`
  margin-top: 3%;
  color: white;
  background-color: red;
  width: 250px;
  height: 60px;
  font-size: 25px;
  border: none;
  border-radius: 5px;
  justify-self: center;
  &:hover {
    opacity: 0.7;
    color: white;
    transition: all 0.3s;
  }
  grid-area: footer;
`

const ReviewModal = (props) => {
  const [score, setScore] = useState(props.ratings)
  const [review, setReview] = useState(props.contents)
  const parms = useParams()

  const reviewChange = (e) => {
    setReview(e.target.value)
  }

  const scoreChange = (e) => {
    setScore(e.target.value)
  }

  const reviewData = {
    contents: review,
    ratings: +score,
    targetId: +parms.id,
    targetType: parms.type,
  }

  const onClickReview = async () => {
    try {
      const res = await createReview(reviewData)
      if (res.status === 201) {
        alert('리뷰가 등록되었습니다.')
        ;(window.location || document.location).reload()
      } else {
        alert(res.data.message)
      }
    } catch (error) {
      alert(error)
    }
  }

  const reviseData = {
    contents: review,
    ratings: +score,
  }

  const onClickReviewRevise = async () => {
    const res = await putReview(props.reviewNo, reviseData)
    if (res.status === 200) {
      alert('리뷰가 수정되었습니다.')
      window.location.reload()
    } else {
      alert(res.data.message)
    }
  }

  return (
    <Container>
      <h1>이 작품 어떠셨나요?</h1>
      <StyledForm>
        <Poster url={props.poster}></Poster>
        <InputContainer>
          <p>{props.title}</p>
          <Rating>
            <input
              onClick={scoreChange}
              type="radio"
              name="rating"
              value="5"
              id="rate1"
              defaultChecked={score === 5}
            />
            <label htmlFor="rate1">⭐</label>
            <input
              onClick={scoreChange}
              type="radio"
              name="rating"
              value="4"
              id="rate2"
              defaultChecked={score === 4}
            />
            <label htmlFor="rate2">⭐</label>
            <input
              onClick={scoreChange}
              type="radio"
              name="rating"
              value="3"
              id="rate3"
              defaultChecked={score === 3}
            />
            <label htmlFor="rate3">⭐</label>
            <input
              onClick={scoreChange}
              type="radio"
              name="rating"
              value="2"
              id="rate4"
              defaultChecked={score === 2}
            />
            <label htmlFor="rate4">⭐</label>
            <input
              type="radio"
              name="rating"
              value="1"
              id="rate5"
              onClick={scoreChange}
              defaultChecked={score === 1}
            />
            <label htmlFor="rate5">⭐</label>
          </Rating>
          {props.contents ? (
            <StyledInput onChange={reviewChange} type="text" value={review} />
          ) : (
            <StyledInput
              onChange={reviewChange}
              type="text"
              placeholder="작품에 대한 감상을 남겨주세요."
            />
          )}
        </InputContainer>
        {!props.revise ? (
          <StyledBtn
            onClick={() => {
              onClickReview()
            }}
          >
            등록
          </StyledBtn>
        ) : (
          <StyledBtn
            onClick={() => {
              onClickReviewRevise()
            }}
          >
            수정
          </StyledBtn>
        )}
      </StyledForm>
    </Container>
  )
}

export default memo(ReviewModal)
