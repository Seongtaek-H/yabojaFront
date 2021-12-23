import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { apiAxios } from '../api/axios'
import Menu from '../components/Menu'
import { getCookie } from '../utils/cookie'
import styles from '../css/Mypage.module.css'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'react-bootstrap'

function MyPage() {
  let state = useSelector((state) => state)
  const jwt = getCookie('jwt')
  const [review, setReview] = useState([])
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState('')

  const myJwt = {
    jwt: jwt,
  }

  const myInfo = {
    yaEmail: state.yaEmail,
  }

  const user = async () => {
    const result = await apiAxios.post('/buyus/me/info', JSON.stringify(myJwt))
    return result
  }
  const userData = async () => {
    try {
      const response = await user()
      setReview(response.data.review)
    } catch (error) {
      console.error(error.response)
    }
  }
  useEffect(() => {
    userData()
  }, [])

  console.log(review[0])

  return (
    <div>
      <div>
        <Menu />
      </div>

      <div className={styles.container}>
        <div className={styles.info_container}>
          <div className={styles.info_avatar}>{state.yaId[0]}</div>
          <p className={styles.info_title}>{state.yaId}님</p>
          <div className={styles.info_point}>
            <p>등급</p>
            <p> {state.yaLevel}</p>
          </div>
          <div className={styles.info_point}>
            <p>포인트</p>
            <p> {state.yaPoint}point</p>
          </div>
        </div>
        <div className={styles.review_container}>
          <h4>내가 쓴 리뷰</h4>
          <hr></hr>
          <div>
            {review.map((review) => (
              <div className={styles.review}>
                <span className={styles.review_content}>
                  {review.reviewBody}
                </span>
                <span className={styles.review_title}>
                  {review.reviewTitle}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            type="button"
            onClick={() => {
              navigate('/')
            }}
          >
            회원정보 수정
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={() => {
              setShowModal(true)
            }}
          >
            회원탈퇴
          </button>
        </div>

        <div>
          <Modal
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
          ></Modal>
        </div>
      </div>
    </div>
  )
}

export default MyPage
