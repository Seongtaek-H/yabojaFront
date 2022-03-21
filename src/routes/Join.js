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
  width: 35vw;
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
  width: 15vw;
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
    background-color: white;
    color: #808080;
    transition: all 0.3s;
  }

  ${(props) =>
    props.join &&
    css`
      font-size: 25px;
      background-color: #3199dc;
      width: 80%;
      height: 60px;
      margin-top: 20px;
      &:hover {
        background-color: navy;
        color: white;
        transition: all 0.3s;
      }
    `}
`

function Join() {
  const [Email, setEmail] = useState('')
  const [Pwd, setPwd] = useState('')
  const [Name, setName] = useState('')
  const [nickName, setNickName] = useState('')
  const [PhNum, setPhNum] = useState('')
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
    Email,
    Pwd,
    Name,
    nickName,
    PhNum,
  }

  const checkId = (Email) => {
    return apiAxios.get(`/buyus/join/checkEmail?email=${Email}`)
  }
  const onClickCheckId = async () => {
    try {
      await checkId(Email)
      alert('사용가능한 이메일입니다')
      setIsCheckEmail(true)
    } catch (error) {
      alert('사용 불가한 형식입니다')
      setEmail('')
    }
  }

  const checkNickName = (nickName) => {
    return apiAxios.get(`/buyus/join/checkId?id=$[nickName}`)
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
    const result = apiAxios.post('/buyus/join', JSON.stringify(joinData))
    return result
  }

  const onClickJoin = async () => {
    if (!isCheckEmail) return alert('이메일 중복 확인을 해주세요.')
    if (!isCheckId) return alert('닉네임 중복 확인을 해주세요')
    if (!Email) return alert('이메일을 입력해주세요')
    if (!Pwd) return alert('비밀번호를 입력해주세요')
    if (Pwd !== checkPwd) return alert('비밀번호가 일치하지 않습니다.')
    if (!Name) return alert('이름을 입력해주세요')
    if (!nickName) return alert('닉네임을 입력해주세요')
    if (!PhNum) return alert('전화번호를 입력해주세요')

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
              value={Email}
              onChange={onChangeEmail}
            />
            <StyledBtn onClick={onClickCheckId}>중복확인</StyledBtn>
          </StyledLabel>

          <StyledLabel htmlFor="pwd">
            <p>비밀번호</p>
            <StyledInput
              id="pwd"
              autoComplete="off"
              type="password"
              value={Pwd}
              onChange={(e) => setPwd(e.target.value)}
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
          {Pwd === checkPwd ? (
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
              value={Name}
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
              value={PhNum}
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
