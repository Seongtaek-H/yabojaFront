import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { apiAxios } from '../api/axios'
import { getCookie, setCookie } from '../utils/cookie'
import styles from '../css/login.module.css'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-modal'
import styled from 'styled-components'
import { FindModal } from '../components/FindModal'

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
  margin-top: 3%;
`

const StyledInput = styled.input`
  background-color: black;
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

const BtnContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`

const FindContainer = styled.div`
  margin-top: 5%;
  width: 65%;
  button {
    width: 45%;
    margin: 0 5px;
  }
  button:hover {
    opacity: 0.7;
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
const StyledModal = styled.div``

function Login() {
  let dispatch = useDispatch()
  let state = useSelector((state) => state)
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showPwdModal, setShowPwdModal] = useState(false)

  const handleInputId = (e) => {
    setId(e.target.value)
  }

  const handleInputPassword = (e) => {
    setPassword(e.target.value)
  }

  let loginData = {
    Email: id,
    Pwd: password,
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

      if (response.data) {
        setCookie('jwt', response.data.jwt, {})
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
      <Container>
        <GridContainer>
          <StyledLabel htmlFor="email">
            <p>이메일</p>
            <StyledInput
              autoComplete="off"
              className={styles.inputStyle}
              type="text"
              id="email"
              value={id}
              onChange={handleInputId}
              placeholder="이메일을 입력하세요."
            />
          </StyledLabel>
          <StyledLabel htmlFor="pwd">
            <p>비밀번호</p>
            <StyledInput
              autoComplete="off"
              className={styles.inputStyle}
              type="password"
              id="pwd"
              value={password}
              onChange={handleInputPassword}
              placeholder="비밀번호를 입력하세요."
            />
          </StyledLabel>
          <StyledBtn onClick={onClickLogin}>로그인하기</StyledBtn>
          <BtnContainer>
            <FindContainer
              style={{
                textAlign: 'center',
              }}
            >
              <button
                onClick={() => {
                  setShowEmailModal(true)
                }}
              >
                아이디 찾기
              </button>
              <button
                onClick={() => {
                  setShowPwdModal(true)
                }}
              >
                비밀번호 찾기
              </button>
            </FindContainer>
          </BtnContainer>
          <Join>
            <JoinText>아직 계정이 없으신가요?</JoinText>
            <JoinLink to={'/join'}>회원가입하기</JoinLink>
          </Join>
        </GridContainer>
      </Container>
      <>
        {showEmailModal ? <FindModal type={'Email'}></FindModal> : ''}
        {showPwdModal ? <FindModal type={'Pwd'}></FindModal> : ''}
      </>
    </>
  )
}
export default Login
