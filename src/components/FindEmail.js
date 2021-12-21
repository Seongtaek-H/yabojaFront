import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { apiAxios } from '../api/axios'

const FindEmail = () => {
  const [yaName, setYaName] = useState('')
  const [yaEmail, setYaEmail] = useState('')
  const [modal, setModal] = useState(false)

  const handleOnClick = () => {
    if (!yaName) return
    const findEmail = async () => {
      try {
        const response = await apiAxios.post(
          `/buyus/login/findEmail`,
          JSON.stringify({
            yaName,
          })
        )
        setYaEmail(response.data.yaEmail)
        setModal(true)
        console.log('response', response)
      } catch (e) {
        alert('올바른 값이 아닙니다')
        console.error(e.response.error)
      }
    }
    findEmail()
  }
  return (
    <div>
      <h1>이메일 찾기</h1>
      <div>
        <input
          type="text"
          value={yaName}
          placeholder="이름을 입력해주세요"
          onChange={(e) => {
            setYaName(e.target.value)
          }}
        />
      </div>
      <button type="button" onClick={handleOnClick}>
        이메일 찾기
      </button>
      {modal ? (
        <Alert variant={'dark'}> 이메일은 '{yaEmail}'' 입니다.</Alert>
      ) : null}
    </div>
  )
}

export default FindEmail
