import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiAxios } from '../api/axios'
import styled, { css } from 'styled-components'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 90vh;
  justify-content: center;
  align-items: center;
`

const Form = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45vw;
  height: 80vh;
  background-color: #212529;
  padding: 1%;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledLabel = styled.label`
  font-size: 20px;
  color: white;
  margin-top: 5px;
`

const StyledInput = styled.input`
  margin-right: 20px;
  margin-bottom: 5%;
  width: 20vw;
  border: none;
  background-color: transparent;
  border-bottom: 1px whitesmoke solid;
  color: white;
  :focus {
    outline: none;
    background-color: transparent;
  }
`
const JoinContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

const StyledBtn = styled.button`
  color: #fff;
  background-color: gray;
  width: 120px;
  height: 40px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  justify-content: center;
  &:hover {
    opacity: 0.7;
    transition: all 0.3s;
  }

  ${(props) =>
    props.join &&
    css`
      font-size: 25px;
      background-color: red;
      width: 80%;
      height: 60px;
      margin-top: 20px;
      &:hover {
        opacity: 0.7;
        color: white;
        transition: all 0.3s;
      }
    `}
`

function Join() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [nickName, setNickName] = useState('')
  const [phoneNumber, setPhNum] = useState('')
  const [isCheckEmail, setIsCheckEmail] = useState(false)
  const [isCheckId, setIsCheckId] = useState(false)
  const [checkPwd, setCheckPwd] = useState('')
  const navigate = useNavigate()

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
    setIsCheckEmail(false)
  }

  const onChangeId = (e) => {
    setNickName(e.target.value)
    setIsCheckId(false)
  }

  const joinData = {
    email,
    password,
    name,
    nickName,
    phoneNumber,
  }

  const checkEmail = (email) => {
    return apiAxios.get(`/user/identities?type="email"&value=${email}`)
  }
  const onClickCheckId = async () => {
    try {
      await checkEmail(email)
      setIsCheckEmail(true)
      alert('사용가능한 email입니다')
    } catch (error) {
      alert(error)
      console.log(error)
    }
  }

  const checkNickName = (nickName) => {
    return apiAxios.get(`/user/identities?type="nickName"&value=${nickName}`)
  }
  const onClickCheckNickName = async () => {
    try {
      await checkNickName(nickName)
      setIsCheckId(true)
      alert('사용가능한 닉네임입니다')
    } catch (error) {
      alert('사용 불가한 형식입니다')
      setNickName('')
    }
  }

  const joinUser = () => {
    const result = apiAxios.post('/user', JSON.stringify(joinData))
    return result
  }

  const onClickJoin = async () => {
    if (!isCheckEmail) return alert('이메일 중복 확인을 해주세요.')
    if (!isCheckId) return alert('닉네임 중복 확인을 해주세요')
    if (!email) return alert('이메일을 입력해주세요')
    if (!password) return alert('비밀번호를 입력해주세요')
    if (password !== checkPwd) return alert('비밀번호가 일치하지 않습니다.')
    if (!name) return alert('이름을 입력해주세요')
    if (!nickName) return alert('닉네임을 입력해주세요')
    if (!phoneNumber) return alert('전화번호를 입력해주세요')

    try {
      const response = await joinUser()
      console.log(response)
      navigate('/')
    } catch (error) {
      alert(error.response.statusText)
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
              onChange={onChangeEmail}
            />
            <StyledBtn onClick={onClickCheckId}>중복확인</StyledBtn>
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
              onChange={(e) => {
                setCheckPwd(e.target.value)
              }}
            />
          </StyledLabel>
          {password === checkPwd ? (
            ''
          ) : (
            <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다</div>
          )}

          <StyledLabel htmlFor="name">
            <p>이름</p>
            <StyledInput
              id="name"
              autoComplete="off"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </StyledLabel>

          <StyledLabel htmlFor="nickName">
            <p>닉네임</p>
            <StyledInput
              id="nickName"
              autoComplete="off"
              type="text"
              value={nickName}
              onChange={onChangeId}
            />
            <StyledBtn onClick={onClickCheckNickName}>중복확인</StyledBtn>
          </StyledLabel>

          <StyledLabel htmlFor="phoneNum">
            <p>전화번호</p>
            <StyledInput
              id="phoneNum"
              autoComplete="off"
              type="nubmer"
              value={phoneNumber}
              onChange={(e) => {
                if (e.target.value.match(/[^0-9]/g))
                  return alert('숫자만 입력 가능합니다')
                setPhNum(e.target.value)
              }}
            />
          </StyledLabel>
          <JoinContainer>
            <StyledBtn join="100%" onClick={onClickJoin}>
              회원가입
            </StyledBtn>
          </JoinContainer>
        </Content>
      </Form>
    </Container>
  )
}

export default Join
