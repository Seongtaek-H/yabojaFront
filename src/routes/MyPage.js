import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { apiAxios } from '../api/axios'
import Menu from '../components/Menu'
import { getCookie } from '../utils/cookie'

function MyPage() {
  let state = useSelector((state) => state)
  const jwt = getCookie('jwt')
  const [review, setReview] = useState([])

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
    <div className="mypage">
      <div calssName="head">
        <title>MyPage</title>
      </div>
      <div className="mypageBody">
        <div className="myInfo">
          <div>{state.yaId}님</div>
          <div>등급: Lv.{state.yaLevel}</div>
          <div>포인트: {state.yaPoint}point</div>
        </div>
        <div className="review">
          <div className="reviewTitle">
            {review.map((review) => (
              <div>{review.reviewTitle}</div>
            ))}
          </div>
          <div className="reviewTitle">
            {review.map((review) => (
              <div>{review.reviewBody}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPage
