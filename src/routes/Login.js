import React, { useState } from 'react'
import { apiAxios } from '../api/axios'
import Button from '../components/Button'

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
    Ya_email: id,
    Ya_pwd: password,
  }

  const loginUser = () => {
    const result = apiAxios.post('buyus/login', JSON.stringify(loginData))
    return result
  }

  const onClickLogin = async () => {
    try {
      const response = await loginUser()
      console.log(response)
      // response 값 확인
      // 디스패치로 response 값 받아와서 스토어 값 수정
      // 토큰 받아서 쿠키나 로컬 스토리지 저장
      // 토큰 => axios 기본값
    } catch (error) {
      console.error(error.response)
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
        <Button text="로그인" onClick={onClickLogin}>
          Login
        </Button>
      </div>
    </div>
  )
}
export default Login
