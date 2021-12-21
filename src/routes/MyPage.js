import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { apiAxios } from '../api/axios'
import Menu from '../components/Menu'
import { getCookie } from '../utils/cookie'
import styles from '../css/mypage.css'
import { useNavigate } from 'react-router-dom'

function MyPage() {
  let state = useSelector((state) => state)
  const jwt = getCookie('jwt')
  const [review, setReview] = useState([])
  const navigate = useNavigate()

  console.log(state)

  const myJwt = {
    jwt: jwt,
  }

  const user = async () => {
    const result = await apiAxios.post('/buyus/me/info', JSON.stringify(myJwt))
    return result
  }
  const userData = async () => {
    try {
      const response = await user()
      console.log(response)
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
      <div calssName="head">
        <title>MyPage</title>
        <div>
          <Menu />
        </div>
      </div>
      <div className="mypage">
        <div className="myInfo">
          <div>{state.yaId}님</div>
          <div>등급: Lv.{state.yaLevel}</div>
          <div>포인트: {state.yaPoint}point</div>
        </div>
        <div className="review">
          <div>내가 쓴 리뷰</div>
          <div>
            {review.map((review) => (
              <div className="review">
                <span className="reviewBody">{review.reviewBody}---</span>
                <span className="reviewTitle">{review.reviewTitle}</span>
              </div>
            ))}
          </div>
        </div>
        <div
          className="modinfo"
          type="button"
          onClick={() => {
            navigate('/')
          }}
        >
          회원정보 수정
        </div>
        <button>회원탈퇴</button>
      </div>
    </div>
  )
}

export default MyPage
