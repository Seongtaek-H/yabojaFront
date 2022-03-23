import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const Poster = styled.div`
  width: 15vw;
  height: 30vh;
  justify-self: center;
  background-image: url(${(props) => props.url});
  background-size: 100% 100%;
  background-position: center center;
  background-color: white;
  border-radius: 10px;
`

const StyledBtn = styled.button`
  margin-top: 5%;
  color: white;
  background-color: red;
  width: 55%;
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
`

const ReviewModal = () => {
  const { id, type } = useParams()
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState([])
  const [score, setScore] = useState(0)
  const [review, setReview] = useState('')

  const getContent = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=6df683327f9037c362fcff75540a2656&language=ko-KR&page=1`
      )
    ).json()
    setLoading(false)
    setContent(json)
  }
  useEffect(() => {
    getContent()
  }, [])

  const makeImagePath = (id) => {
    return `https://image.tmdb.org/t/p/original/${id}`
  }

  const reviewChange = (e) => {
    setReview(e.target.value)
    console.log(review)
  }
  const scoreChange = (e) => {
    setScore(e.target.value)
    console.log(score)
  }

  return (
    <>
      <Container>
        <h1>이 작품 어떠셨나요?</h1>
        <Poster url={makeImagePath(content.poster_path)}></Poster>
        <form>
          <div>
            <input
              onClick={scoreChange}
              type="radio"
              name="rating"
              value="5"
              id="rate1"
            />
            <label htmlFor="rate1">
              <i className="fas fa-star"></i>
            </label>
            <input
              onClick={scoreChange}
              type="radio"
              name="rating"
              value="4"
              id="rate2"
            />
            <label htmlFor="rate2">
              <i className="fas fa-star"></i>
            </label>
            <input
              onClick={scoreChange}
              type="radio"
              name="rating"
              value="3"
              id="rate3"
            />
            <label htmlFor="rate3">
              <i className="fas fa-star"></i>
            </label>
            <input
              onClick={scoreChange}
              type="radio"
              name="rating"
              value="2"
              id="rate4"
            />
            <label htmlFor="rate4">
              <i className="fas fa-star"></i>
            </label>
            <input
              onClick={scoreChange}
              type="radio"
              name="rating"
              value="1"
              id="rate5"
            />
            <label htmlFor="rate5">
              <i className="fas fa-star"></i>
            </label>
          </div>
          <input
            onChange={reviewChange}
            type="text"
            placeholder="작품에 대한 감상을 남겨주세요."
          />
          <StyledBtn type="submit">작성하기</StyledBtn>
        </form>
      </Container>
    </>
  )
}

export default ReviewModal
