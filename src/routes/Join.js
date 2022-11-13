import { useState } from 'react'
import styled, { css } from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { registerUser, checkEmail, checkNickName } from '../api/axios'

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`
const Form = styled.div`
  margin-top: 50px;
  width: 700px;
  background-color: #212529;
  padding: 35px;
  border-radius: 10px;
  font-size: 1.2rem;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
`
const StyledLabel = styled.label`
  color: white;
`
const StyledInput = styled.input`
  margin-bottom: 20px;
  width: 70%;
  padding: 10px 0;
  border: none;
  font-size: 1.1rem;
  background-color: transparent;
  border-bottom: 1px whitesmoke solid;
  color: white;
  :focus {
    outline: none;
    background-color: transparent;
  }
`
const BtnContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`
const StyledBtn = styled.button`
  color: #fff;
  background-color: gray;
  width: 120px;
  height: 50px;
  border: none;
  margin-left: 20px;
  border-radius: 10px;
  justify-content: center;
  font-size: 1.2rem;
  &:hover {
    opacity: 0.7;
    transition: all 0.3s;
  }

  ${(props) =>
    props.join &&
    css`
      font-size: 1.5rem;
      background-color: red;
      width: 300px;
      height: 80px;
      margin-left: 0;
      margin-top: 20px;
      &:hover {
        opacity: 0.7;
        color: white;
        transition: all 0.3s;
      }
    `}
`
const WarningTxt = styled.div`
  color: red;
`
function Join() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPwd, setCheckPwd] = useState('')
  const [name, setName] = useState('')
  const [nickName, setNickName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isCheckEmail, setIsCheckEmail] = useState(false)
  const [isCheckNickName, setIsCheckNickName] = useState(false)

  const navigate = useNavigate()

  const joinData = {
    email,
    password,
    name,
    nickName,
    phoneNumber,
  }

  const handleChangeEmail = (e) => {
    setIsCheckEmail(false)
    setEmail(e.target.value)
  }

  const handleChangeNickName = (e) => {
    setIsCheckNickName(false)
    setNickName(e.target.value)
  }

  const handleCheckEmail = async () => {
    try {
      const { data } = await checkEmail(email)
      if (!data.isExist) {
        alert('사용할 수 있는 이메일입니다.')
        setIsCheckEmail(true)
      } else {
        alert('사용할 수 없는 이메일입니다.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCheckNickName = async () => {
    try {
      const { data } = await checkNickName(nickName)
      if (!data.isExist) {
        alert('사용가능한 닉네임입니다')
        setIsCheckNickName(true)
      } else {
        alert('이미 있는 닉네임입니다')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const checkPhoneNum = (phoneNumber) => {
    phoneNumber = phoneNumber.toString()
    return phoneNumber.match(/[^\d]/g)
  }

  const handleJoin = async () => {
    if (!isCheckEmail) return alert('이메일 중복 확인을 해주세요.')
    if (!isCheckNickName) return alert('닉네임 중복 확인을 해주세요')
    if (!email) return alert('이메일을 입력해주세요')
    if (!password) return alert('비밀번호를 입력해주세요')
    if (password !== checkPwd) return alert('비밀번호가 일치하지 않습니다.')
    if (!name) return alert('이름을 입력해주세요')
    if (!nickName) return alert('닉네임을 입력해주세요')
    if (!phoneNumber) return alert('전화번호를 입력해주세요')
    if (checkPhoneNum(phoneNumber) != null)
      return alert('전화번호 형식이 맞지 않습니다. 숫자로만 입력해주세요.')
    try {
      await registerUser(joinData)
      alert('야보자에 오신 걸 환영합니다!🎉')
      navigate('/login')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <Container>
      <Form>
        <Content>
          <StyledLabel htmlFor="email">
            <p>이메일</p>
            <StyledInput
              id="email"
              autoComplete="off"
              type="text"
              value={email}
              onChange={handleChangeEmail}
            />
            <StyledBtn onClick={handleCheckEmail}>중복확인</StyledBtn>
          </StyledLabel>

          <StyledLabel htmlFor="password">
            <p>비밀번호</p>
            <StyledInput
              id="password"
              autoComplete="off"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </StyledLabel>
          <StyledLabel htmlFor="pwdCheck">
            <p>비밀번호 확인</p>
            <StyledInput
              id="pwdCheck"
              autoComplete="off"
              type="password"
              value={checkPwd}
              onChange={(e) => setCheckPwd(e.target.value)}
            />
          </StyledLabel>
          {password === checkPwd ? (
            ''
          ) : (
            <WarningTxt>비밀번호가 일치하지 않습니다</WarningTxt>
          )}
          <StyledLabel htmlFor="name">
            <p>이름</p>
            <StyledInput
              id="name"
              autoComplete="off"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </StyledLabel>

          <StyledLabel htmlFor="nickName">
            <p>닉네임</p>
            <StyledInput
              id="nickName"
              autoComplete="off"
              type="text"
              value={nickName}
              onChange={handleChangeNickName}
            />
            <StyledBtn onClick={handleCheckNickName}>중복확인</StyledBtn>
          </StyledLabel>

          <StyledLabel htmlFor="phoneNum">
            <p>전화번호</p>
            <StyledInput
              id="phoneNum"
              autoComplete="off"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="숫자로만 입력해주세요."
            />
          </StyledLabel>
          <BtnContainer>
            <StyledBtn join="100%" onClick={handleJoin}>
              회원가입
            </StyledBtn>
          </BtnContainer>
        </Content>
      </Form>
    </Container>
  )
}

export default Join
