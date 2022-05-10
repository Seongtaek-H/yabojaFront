import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { ReviewList } from '../components/ReviewList'

import Modal from 'react-modal/lib/components/Modal'

import ReviewModal from '../components/ReviewModal'
import Loading from '../components/loading'
import { getReview } from '../api/axios'

const Bg = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)),
    url(${(props) => props.url});
  background-size: cover;
  background-position: center center;
  /* overflow: scroll; */
`

const WriteBtn = styled.div`
  position: fixed;
  bottom: 20px;
  right: 50px;
  cursor: pointer;
  font-size: 5rem;
  &:hover {
    transform: scale(1.1);
  }
`
const Reviews = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 : {
    font-size: 5rem;
  }
`
function Review(props) {
  const { id, type } = useParams()
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState([])
  const [reviews, setReviews] = useState([])
  const [showReviewModal, setShowReviewModal] = useState(false)

  const API_KEY = process.env.REACT_APP_API_KEY

  const getContent = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=en-US&page=1`
      )
    ).json()
    setContent(json)
    setLoading(false)
  }
  useEffect(() => {
    getContent()
    const review = async () => {
      const res = await getReview(id, type)
      setReviews(res.data.reviews)
      setLoading(false)
    }
    review()
  }, [])
  const makeImagePath = (path) => {
    return `https://image.tmdb.org/t/p/original/${path}`
  }
  return (
    <>
      {!loading ? (
        <Bg url={makeImagePath(content.backdrop_path)}>
          <WriteBtn
            onClick={() => {
              setShowReviewModal(true)
            }}
          >
            <i className="fas fa-pen-square"></i>
          </WriteBtn>
          <Reviews>
            <h1>{content.title ? content.title : content.name}</h1>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.no}>
                  <ReviewList data={review}></ReviewList>
                </div>
              ))
            ) : (
              <p>아직 작성된 리뷰가 없습니다.</p>
            )}
          </Reviews>
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
              poster={makeImagePath(content.backdrop_path)}
              title={content.title ? content.title : content.name}
              id={content.id}
            ></ReviewModal>
          </Modal>
        </Bg>
      ) : (
        <Loading></Loading>
      )}
    </>
  )
}

export default Review
