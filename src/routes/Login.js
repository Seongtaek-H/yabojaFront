import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiAxios } from '../api/axios'
import { login } from '../context/action'
import { setCookie } from '../utils/cookie'
import styles from '../css/login.css'
import { useDispatch } from 'react-redux'
import Menu from '../components/Menu'

function Login() {
  let dispatch = useDispatch()
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
        dispatch({ type: 'LOGIN', userData: response.data.resultVO })
        navigate('/')
      }
      login()
      // redux thunk
      // 디스패치로 response 값 받아와서 스토어 값 수정
    } catch (error) {
      console.error(error.response)
      alert(error)
      // 에러메시지에 따라서 if문으로 나누거나 그냥 띄우거나
    }
  }
  return (
    <div>
      <Menu />
      <div className="gridContainer">
        <div></div>
        <div class={styles.sec2}></div>
        <div class={styles.center}></div>
        <div class={styles.center}></div>
        <div className={styles.flexContainer}>
          <label htmlFor="input_id">Email </label>
          <div className={styles.fieldContainer}></div>
          <input
            className="inputStyle"
            type="text"
            name="input_id"
            value={id}
            onChange={handleInputId}
          />
          <div></div>

          <label htmlFor="input_pw">PW </label>
          <div className={styles.fieldContainer}></div>
          <input
            className="inputStyle"
            type="password"
            name="input_pw"
            value={password}
            onChange={handleInputPassword}
          />
          <div className="loginBody">
            <button className={styles.btn} onClick={onClickLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login
