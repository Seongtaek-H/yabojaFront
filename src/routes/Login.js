import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { login } from '../store/isLoginSlice'

import styled from 'styled-components'

import { getUser, loginUser } from '../api/axios'
import { saveAuthToCookie, saveUserToCookie } from '../utils/cookie'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
`
const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 80%;
  padding: 30px 30px;
  justify-content: center;
  align-items: center;
  background-color: #212529;
  border-radius: 10px;
`
const StyledLabel = styled.label`
  width: 100%;
  margin-top: 3%;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 20px;
    width: 15%;
  }
`
const StyledInput = styled.input`
  background-color: black;
  width: 50%;
  height: 60px;
  padding: 10px;
  color: white;
  border: none;
  font-size: 20px;
  :focus {
    outline: #808080 solid 1px;
  }
`
const StyledBtn = styled.button`
  margin-top: 5%;
  color: white;
  background-color: red;
  width: 55%;
  height: 60px;
  font-size: 25px;
  border: none;
  border-radius: 5px;
  justify-content: center;
  &:hover {
    opacity: 0.7;
    color: white;
    transition: all 0.3s;
  }
`
const Join = styled.div`
  margin-top: 5%;
`
const JoinText = styled.span`
  opacity: 0.7;
  margin-right: 20px;
`
const JoinLink = styled(Link)`
  all: unset;
  cursor: pointer;

  &:hover {
    color: white;
    opacity: 0.7;
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
        <GridContainer>
          <StyledLabel htmlFor="email">
            <p>이메일</p>
            <StyledInput
              autoComplete="off"
              type="text"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              placeholder="이메일을 입력하세요."
            />
          </StyledLabel>
          <StyledLabel htmlFor="pwd">
            <p>비밀번호</p>
            <StyledInput
              autoComplete="off"
              type="password"
              id="pwd"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              placeholder="비밀번호를 입력하세요."
            />
          </StyledLabel>
          <StyledBtn onClick={handleLogin}>로그인하기</StyledBtn>
          <Join>
            <JoinText>아직 계정이 없으신가요?</JoinText>
            <JoinLink to={'/join'}>회원가입하기</JoinLink>
          </Join>
        </GridContainer>
      </Container>
    </>
  )
}
export default Login
