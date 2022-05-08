import styled from 'styled-components'
import { useState } from 'react'
import { findEmail } from '../api/axios'

const FindContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
const StyledLabel = styled.label`
  width: 80%;
  margin-top: 3%;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    font-size: 20px;
    width: 20%;
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
export const FindModal = ({ type }) => {
  const [name, setName] = useState('')
  const [phNum, setPhNum] = useState('')

  const handleFindEmail = async () => {
    const response = await findEmail({
      name,
      phNum,
    })
    console.log(response)
  }

  return (
    <>
      {type === 'Email' ? (
        <FindContainer>
          <StyledLabel>
            <div>이름</div>
            <StyledInput
              onChange={(e) => {
                setName(e.target.value)
              }}
              placeholder="이름을 입력해주세요"
            ></StyledInput>
          </StyledLabel>
          <StyledLabel>
            <div>전화번호</div>
            <StyledInput
              onChange={(e) => {
                setPhNum(e.target.value)
              }}
              placeholder="전화번호를 입력해주세요"
            ></StyledInput>
          </StyledLabel>
          <StyledBtn onClick={handleFindEmail}>이메일 찾기</StyledBtn>

          {/* {auth ? (
            <span style={{ marginTop: '20px' }}>
              당신의 이메일은{' '}
              <strong style={{ color: 'orange' }}>{email}</strong>
              입니다.
            </span>
          ) : (
            <span style={{ marginTop: '20px' }}>
              입력하신 정보가 맞지 않습니다.
            </span>
          )} */}
        </FindContainer>
      ) : (
        ''
        // <FindContainer>
        //   <StyledLabel>
        //     <div>이메일</div>
        //     <StyledInput
        //       onChange={onChangeEmail}
        //       placeholder="이메일을 입력해주세요"
        //     ></StyledInput>
        //   </StyledLabel>
        //   <StyledLabel>
        //     <div>전화번호</div>
        //     <StyledInput
        //       onChange={onChangePhn}
        //       placeholder="전화번호를 입력해주세요"
        //     ></StyledInput>
        //   </StyledLabel>
        //   <StyledBtn
        //     onClick={() => {
        //       setPwd(FindUserPwd(email, phNum))
        //     }}
        //   >
        //     비밀번호 찾기
        //   </StyledBtn>
        //   {auth ? (
        //     <span style={{ marginTop: '20px' }}>
        //       당신의 비밀번호는{' '}
        //       <strong style={{ color: 'orange' }}>
        //         {/* {pwd[0] + pwd[1] + pwd[2] + pwd[3] + '*'.repeat(pwd.length - 4)} */}
        //       </strong>
        //       입니다.
        //     </span>
        //   ) : (
        //     <span style={{ marginTop: '20px' }}>
        //       입력하신 정보가 맞지 않습니다.
        //     </span>
        //   )}
        // </FindContainer>
      )}
    </>
  )
}
