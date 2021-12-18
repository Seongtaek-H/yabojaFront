import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiAxios } from '../api/axios'
import { login } from '../context/action'
import { setCookie } from '../utils/cookie'
import styles from '../css/login.css'
import { useSelector, useDispatch } from 'react-redux'
import Menu from '../components/Menu'

function Login() {
  let dispatch = useDispatch()
  let state = useSelector((state) => state)
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleInputId = (e) => {
    setId(e.target.value)
  }

  const handleInputPassword = (e) => {
    setPassword(e.target.value)
  }

  let loginData = {
    yaEmail: id,
    yaPwd: password,
  }

  const loginUser = async () => {
    const result = await apiAxios.post(
      '/buyus/login',
      JSON.stringify(loginData)
    )

    return result
  }

  const onClickLogin = async () => {
    try {
      const response = await loginUser()
      console.log(response.data)
      if (response.data.jwt) {
        setCookie('jwt', response.data.jwt, {
          path: '/',
          secure: true,
          sameSite: 'none',
        })
        dispatch({ type: 'LOGIN', userData: response.data.memVO })
        console.log(state)
        navigate('/')
      }
    } catch (error) {
      console.error(error.response)
      alert(error)
      // 에러메시지에 따라서 if문으로 나누거나 그냥 띄우거나
    }
  }
  return (
    <div>
      <Menu />
      <head>
        <title>login</title>
      </head>
      <div className="body">
        <div class="inputEmail">
          <label htmlFor="input_id">이메일 </label>
          <input
            className="inputStyle"
            type="text"
            name="input_id"
            value={id}
            onChange={handleInputId}
          />
        </div>
        <div className="inputPw">
          <label htmlFor="input_pw">비밀번호 </label>
          <input
            className="inputStyle"
            type="password"
            name="input_pw"
            value={password}
            onChange={handleInputPassword}
          />
        </div>

        <div className="login">
          <button className="loginBtn" onClick={onClickLogin}>
            로그인
          </button>
        </div>
      </div>
    </div>
  )
}
export default Login
