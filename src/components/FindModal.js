import styled from 'styled-components'
import { useState, useRef } from 'react'
import { FindUserEmail } from './Find'

const Container = styled.div`
  background-color: green;
  width: 40vw;
  height: 50vh;
  position: absolute;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
`
const FindEmail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
`
const StyledLabel = styled.label`
  width: 80%;
  display: flex;
  align-items: center;
  div {
    margin: 10px;
    width: 20%;
    text-align: center;
  }
`

const StyledInput = styled.input`
  background-color: black;
  color: white;
  border: none;
  font-size: 20px;
  width: 60%;
  height: 80%;
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

export const FindModal = ({ type }) => {
  const [auth, setAuth] = useState(false)
  const [name, setName] = useState('')
  const [phNum, setPhNum] = useState('')

  const onChangeName = (e) => {
    setName(e.target.value)
  }
  const onChangePhn = (e) => {
    setPhNum(e.target.value)
  }

  return (
    <Container>
      {type === 'Email' ? (
        <FindEmail>
          <StyledLabel>
            <div>이름</div>
            <StyledInput
              onChange={onChangeName}
              placeholder="이름을 입력해주세요"
            ></StyledInput>
          </StyledLabel>
          <StyledLabel>
            <div>전화번호</div>
            <StyledInput
              onChange={onChangePhn}
              placeholder="전화번호를 입력해주세요"
            ></StyledInput>
          </StyledLabel>
          <StyledBtn
            onClick={() => {
              FindUserEmail(name, phNum)
            }}
          >
            이메일 찾기
          </StyledBtn>
          {auth ? (
            <span style={{ marginTop: '20px' }}>
              당신의 이메일은 <strong style={{ color: 'orange' }}>{}</strong>
              입니다.
            </span>
          ) : (
            <span style={{ marginTop: '20px' }}>
              입력하신 정보가 맞지 않습니다.
            </span>
          )}
        </FindEmail>
      ) : (
        ''
      )}
    </Container>
  )
}
