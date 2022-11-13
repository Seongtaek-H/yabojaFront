import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { login } from '../store/isLoginSlice'

import styled from 'styled-components'

import { getUser, loginUser } from '../api/axios'
import { saveAuthToCookie, saveUserToCookie } from '../utils/cookie'

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`
const LoginWindow = styled.div`
  margin-top: 200px;
  width: 900px;
  height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #212529;
  border-radius: 10px;
  font-size: 1.5rem;

  div {
    width: 70%;
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
    margin-bottom: 20px;
    label {
      justify-self: center;
    }
    input {
      background-color: black;
      font-size: 1.2rem;
      height: 50px;
      padding: 15px;
      color: white;
      border: none;
      :focus {
        outline: #808080 solid 1px;
      }
    }
  }
  div:last-child {
    display: flex;
    justify-content: space-evenly;
    a {
      text-decoration: none;
      color: white;
    }
  }
`
const StyledBtn = styled.button`
  margin-top: 20px;
  margin-bottom: 40px;
  color: white;
  background-color: red;
  width: 50%;
  height: 80px;
  font-size: 1.5rem;
  border: none;
  border-radius: 10px;
  &:hover {
    opacity: 0.7;
    color: white;
    transition: all 0.3s;
  }
`

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loginData = {
    email: email,
    password: password,
  }

  const handleLogin = async () => {
    try {
      const { data } = await loginUser(loginData)
      saveAuthToCookie(data.accessToken)
      alert(data.message)

      const {
        data: { user },
      } = await getUser()
      saveUserToCookie(JSON.stringify(user))
      dispatch(login())
      navigate('/')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
      <Container>
        <LoginWindow>
          <div>
            <label htmlFor="email">이메일</label>
            <input
              autoComplete="off"
              type="text"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              placeholder="이메일을 입력하세요."
            />
          </div>
          <div>
            <label htmlFor="pwd">비밀번호</label>
            <input
              autoComplete="off"
              type="password"
              id="pwd"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              placeholder="비밀번호를 입력하세요."
            />
          </div>
          <StyledBtn onClick={handleLogin}>로그인하기</StyledBtn>
          <div>
            <span>아직 계정이 없으신가요?</span>
            <Link to={'/join'}>회원가입하기</Link>
          </div>
        </LoginWindow>
      </Container>
    </>
  )
}
export default Login
