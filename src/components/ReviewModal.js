import styled from 'styled-components'
import { memo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createReview, putReview } from '../api/axios'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr 0.7fr;
  h1 {
    font-size: 1.75rem;
  }
  p {
    font-size: 1.5rem;
    margin: 0.5rem 0;
  }
`
const Rating = styled.div`
  direction: rtl;
  text-align: left;
  input[type='radio'] {
    display: none;
    &:checked ~ label {
      text-shadow: 0 0 0 orange;
    }
  }
  label {
    cursor: pointer;
    font-size: 1.5rem;
    color: transparent;
    text-shadow: 0 0 0 #f0f0f0;
    &:hover {
      text-shadow: 0 0 0 orange;
    }
    &:hover ~ label {
      text-shadow: 0 0 0 orange;
    }
  }
`

const StyledInput = styled.input`
  padding: 5%;
  width: 100%;
  background-color: #171721;
  border-radius: 10px;
  color: white;
  border: none;
  :focus {
    outline: none;
  }
`

const StyledBtn = styled.button`
  color: white;
  background-color: red;
  width: 250px;
  height: 60px;
  font-size: 25px;
  border: none;
  border-radius: 5px;
  justify-self: center;
  align-self: center;
  &:hover {
    opacity: 0.7;
    color: white;
    transition: all 0.3s;
  }
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
      <section>
        <h1>이 작품 어떠셨나요?</h1>
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
      </section>
      {props.contents ? (
        <StyledInput onChange={reviewChange} type="text" value={review} />
      ) : (
        <StyledInput
          onChange={reviewChange}
          type="text"
          placeholder="작품에 대한 감상을 남겨주세요."
        />
      )}
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
    </Container>
  )
}

export default memo(ReviewModal)
