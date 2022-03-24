import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { apiAxios } from '../api/axios'

const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  align-items: center;
`

const StyledForm = styled.form`
  width: 100%;
  display: grid;
  grid-template:
    'poster content' 5fr
    'footer footer' 1fr / 1fr 1fr;
`

const Poster = styled.div`
  width: 25vw;
  height: 30vh;
  grid-area: poster;
  background-image: url(${(props) => props.url});
  background-size: 100% 100%;
  background-position: center center;
  background-color: white;
  border-radius: 10px;
`
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Rating = styled.div`
  direction: rtl;
  text-align: center;
  input[type='radio'] {
    display: none;
    &:checked ~ label {
      text-shadow: 0 0 0 orange;
    }
  }

  label {
    font-size: 25px;
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
  padding: 10px;
  width: 70%;
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
  margin-top: 5%;
  color: white;
  background-color: red;
  width: 30%;
  height: 60px;
  font-size: 25px;
  border: none;
  border-radius: 5px;
  justify-content: center;
  &:hover {
    opacity: 0.7;
    color: white;
    transition: all 0.3s;
  }
  grid-area: footer;
`

const ReviewModal = (props) => {
  const { id, type } = useParams()
  const [score, setScore] = useState(0)
  const [review, setReview] = useState('')

  const reviewChange = (e) => {
    setReview(e.target.value)
    console.log(review)
  }
  const scoreChange = (e) => {
    setScore(e.target.value)
    console.log(score)
  }

  const reviewSubmit = async () => {
    try {
      await apiAxios.get('/review')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
      <h1>이 작품 어떠셨나요?</h1>
      <Container>
        <StyledForm onSubmit={reviewSubmit}>
          <Poster url={props.poster}></Poster>
          <InputContainer>
            <h2>{props.title}</h2>
            <Rating>
              <input
                onClick={scoreChange}
                type="radio"
                name="rating"
                value="5"
                id="rate1"
              />
              <label htmlFor="rate1">⭐</label>
              <input
                onClick={scoreChange}
                type="radio"
                name="rating"
                value="4"
                id="rate2"
              />
              <label htmlFor="rate2">⭐</label>
              <input
                onClick={scoreChange}
                type="radio"
                name="rating"
                value="3"
                id="rate3"
              />
              <label htmlFor="rate3">⭐</label>
              <input
                onClick={scoreChange}
                type="radio"
                name="rating"
                value="2"
                id="rate4"
              />
              <label htmlFor="rate4">⭐</label>
              <input
                onClick={scoreChange}
                type="radio"
                name="rating"
                value="1"
                id="rate5"
              />
              <label htmlFor="rate5">⭐</label>
            </Rating>
            <StyledInput
              onChange={reviewChange}
              type="text"
              placeholder="작품에 대한 감상을 남겨주세요."
            />
          </InputContainer>
          <StyledBtn type="submit">작성하기</StyledBtn>
        </StyledForm>
      </Container>
    </>
  )
}

export default ReviewModal
