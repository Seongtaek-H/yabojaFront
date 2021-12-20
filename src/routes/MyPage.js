import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { apiAxios } from '../api/axios'
import Menu from '../components/Menu'
import { getCookie } from '../utils/cookie'

function MyPage() {
  let state = useSelector((state) => state)
  const jwt = getCookie('jwt')
  const [memVO, setMemVO] = useState()
  const [review, setReview] = useState()

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

      setMemVO(response.data.memVO)
      setReview(response.data.review)
    } catch (error) {
      console.error(error.response)
    }
  }
  useEffect(() => {
    userData()
  }, [])

  console.log(memVO)
  console.log(review)

  return (
    <div>
      <head>
        <title>MyPage</title>
      </head>
      <div>{memVO}</div>
      <div>
        {review.map((index, i) => (
          <div>{index}</div>
        ))}
      </div>
    </div>
  )
}

export default MyPage
