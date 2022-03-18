import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { ReviewList } from '../components/ReviewList'

import { reviewData } from '../constants/dummy'

const Bg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 90vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)),
    url(${(props) => props.url});
  background-size: cover;
  background-position: center center;
`

const WriteBtn = styled.div`
  position: fixed;
  bottom: 20px;
  right: 50px;
  cursor: pointer;
  font-size: 100px;
  &:hover {
    transform: scale(1.1);
  }
`

function Review() {
  const { id, type } = useParams()
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState([])
  const [reviews, setReviews] = useState([])

  const getContent = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=6df683327f9037c362fcff75540a2656&language=en-US&page=1`
      )
    ).json()
    setContent(json)
    setLoading(false)
  }

  useEffect(() => {
    getContent()
  }, [])

  useEffect(() => {
    getReviews()
  }, [])

  const makeImagePath = (path) => {
    return `https://image.tmdb.org/t/p/original/${path}`
  }
  const getReviews = () => {
    setReviews(reviewData)
  }
  // const getReviews = async () => {
  //   const json = await (
  //     await fetch(`/buyus/readreview/?reviewTitle=${content.title}`)
  //   ).json()
  //   setReviews(json)
  // }

  return (
    <>
      {!loading ? (
        <Bg url={makeImagePath(content.backdrop_path)}>
          <WriteBtn onClick={''}>
            <i className="fas fa-pen-square"></i>
          </WriteBtn>
          {reviews.length > 0 ? (
            reviews.map((a) => (
              <>
                <ReviewList data={a}></ReviewList>
              </>
            ))
          ) : (
            <h1>작성된 리뷰가 없습니다.</h1>
          )}
        </Bg>
      ) : (
        ''
      )}
    </>
  )
}

export default Review
