import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { ReviewList } from '../components/ReviewList'
import Modal from 'react-modal/lib/components/Modal'
import ReviewModal from '../components/ReviewModal'
import Loading from '../components/loading'
import { getReview } from '../api/axios'

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    margin: 0;
    margin-top: 1rem;
  }
`
const NoReview = styled.div`
  margin-top: 1rem;
  font-size: 2rem;
`
function Review() {
  const { id, type } = useParams()
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState([])
  const [reviews, setReviews] = useState([])
  const [showReviewModal, setShowReviewModal] = useState(false)

  const API_KEY = process.env.REACT_APP_API_KEY

  useEffect(() => {
    getContent()
    review()
  }, [])

  const review = async () => {
    const res = await getReview(id, type)
    setReviews(
      res.data.reviews.sort((a, b) => {
        return b.no - a.no
      })
    )
    setLoading(false)
  }

  const getContent = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=en-US&page=1`
      )
    ).json()
    setContent(json)
    setLoading(false)
  }

  const makeImagePath = (path) => {
    return `https://image.tmdb.org/t/p/original/${path}`
  }

  return (
    <>
      {!loading ? (
        <Container>
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
              <NoReview>아직 작성된 리뷰가 없습니다.</NoReview>
            )}
          </Reviews>
          <Modal
            isOpen={showReviewModal}
            onRequestClose={() => {
              setShowReviewModal(false)
            }}
            ariaHideApp={false}
            style={{
              overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                zIndex: 99999,
              },
              content: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60%',
                height: '90%',
                maxWidth: '60rem',
                maxHeight: '30rem',
                border: '1px solid #ccc',
                background: '#212529',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '1rem',
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
        </Container>
      ) : (
        <Loading></Loading>
      )}
    </>
  )
}

export default Review
