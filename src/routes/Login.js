import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { apiAxios } from '../api/axios'
import { login } from '../context/action'
import { setCookie } from '../utils/cookie'
import styles from '../css/login.module.css'
import { useSelector, useDispatch } from 'react-redux'
import Menu from '../components/Menu'
import { render } from 'react-dom'
import { LOGIN } from '../context/type'
import Modal from 'react-modal'
import FindUserInfo from './Find'

function Login() {
  let dispatch = useDispatch()
  let state = useSelector((state) => state)
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState('')

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

      if (response.data.jwt) {
        setCookie('jwt', response.data.jwt, {
          path: '/',
          secure: true,
          sameSite: 'none',
        })
        dispatch({ type: 'LOGIN', userData: response.data.memVO })
        navigate('/')
      }
    } catch (error) {
      console.error(error.response)
      alert('아이디 및 비밀번호가 정확하지 않습니다.')
      // 에러메시지에 따라서 if문으로 나누거나 그냥 띄우거나
    }
  }

  return (
    <>
      <Menu />
      <div className={styles.blank}></div>
      <span className={styles.title}>로그인</span>
      <div className={styles.flexContainer}>
        <div className={styles.gridContainer}>
          <div>
              <label htmlFor="input_id">이메일</label>
              <input
                autoComplete='off'
                className={styles.inputStyle}
                type="text"
                name="input_id"
                value={id}
                onChange={handleInputId}
                placeholder='이메일을 입력하세요.'
              />
              <label htmlFor="input_pw">비밀번호</label>
              <input
                autoComplete='off'
                className={styles.inputStyle}
                type="password"
                name="input_pw"
                value={password}
                onChange={handleInputPassword}
                placeholder='비밀번호를 입력하세요.'
              />
            </div>
          <div>
            <button onClick={onClickLogin}>
              로그인
            </button>
          </div>
          <div>
            <Link to={"/join"} className={styles.spanLink}>
              회원가입
            </Link>
            <span className={styles.spanLink}
              onClick={() => {
                setShowModal(true)
              }}
            >
              아이디 비밀번호 찾기
            </span>
          </div>
        </div>
      </div>
     

        <div>
          <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
            <FindUserInfo />
          </Modal>
        </div>
    </>
  )
}
export default Login
