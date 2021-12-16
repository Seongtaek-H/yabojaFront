import React, { useState } from 'react'
import { apiAxios } from '../api/axios'
import { setCookie } from '../utils/cookie'

function Login() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const handleInputId = (e) => {
    setId(e.target.value)
  }

  const handleInputPassword = (e) => {
    setPassword(e.target.value)
  }

  let loginData = {
    YaEmail: id,
    YaPwd: password,
  }

  const loginUser = () => {
    const result = apiAxios.post('/buyus/login', JSON.stringify(loginData))
    return result
  }

  const onClickLogin = async () => {
    try {
      const response = await loginUser()
      console.log(response)
      if (response.data.jwt) {
        setCookie('jwt', response.data.jwt, {
          path: '/',
          secure: true,
          sameSite: 'none',
        })
      }
      // redux thunk
      // 디스패치로 response 값 받아와서 스토어 값 수정
    } catch (error) {
      console.error(error.response)
      // 에러메시지에 따라서 if문으로 나누거나 그냥 띄우거나
    }
  }
  return (
    <div>
      <h2>Login</h2>
      <div>
        <label htmlFor="input_id">ID : </label>
        <input
          type="text"
          name="input_id"
          value={id}
          onChange={handleInputId}
        />
      </div>
      <div>
        <label htmlFor="input_pw">PW : </label>
        <input
          type="password"
          name="input_pw"
          value={password}
          onChange={handleInputPassword}
        />
      </div>
      <div>
        <button onClick={onClickLogin}>Login</button>
      </div>
    </div>
  )
}
export default Login
