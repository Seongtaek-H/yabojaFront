import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { apiAxios } from '../api/axios'
import Menu from '../components/Menu'
import { getCookie } from '../utils/cookie'

function MyPage() {
  let state = useSelector((state) => state)
  const jwt = getCookie('jwt')

  const myData = {
    YbjMemVO: state,
    jwt: jwt,
  }
  console.log(state)
  console.log(myData)
  const user = () => {
    const result = apiAxios.post('/buyus/me/info', JSON.stringify(myData))
    return result
  }
  const userData = async () => {
    try {
      const response = await user()
      console.log(response)
    } catch (error) {
      console.error(error.response)
    }
  }

  useEffect(() => {
    userData()
  })

  return (
    <div>
      <head>
        <title>MyPage</title>
      </head>
      <div>
        <button onclick={userData}>테스트</button>
      </div>
    </div>
  )
}

export default MyPage
