import { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { apiAxios } from '../api/axios'

const FindPassword = () => {
  const [yaEmail, setYaEmail] = useState('')
  const [yaPhNum, setYaPhNum] = useState('')
  const [yaPwd, setYaPwd] = useState('')
  const [modal, setModal] = useState(false)

  const handleOnClick = () => {
    if (!(yaEmail && yaPhNum)) return
    const findPassword = async () => {
      try {
        const response = await apiAxios.post(
          `/buyus/login/findPwd`,
          JSON.stringify({
            yaEmail,
            yaPhNum,
          })
        )
        console.log('response', response)
        setYaPwd(response.data.yaPwd)
        setModal(true)
      } catch (e) {
        alert('올바른 값이 아닙니다')
        console.error(e.response.error)
      }
    }
    findPassword()
  }
  return (
    <div>
      <h1>비밀번호 찾기</h1>
      <div>
        <input
          type="text"
          value={yaEmail}
          placeholder="이메일을 입력해주세요"
          onChange={(e) => {
            setYaEmail(e.target.value)
          }}
        />
      </div>
      <div>
        <input
          type="text"
          value={yaPhNum}
          placeholder="전화번호를을 입력해주세요"
          onChange={(e) => {
            setYaPhNum(e.target.value)
          }}
        />
      </div>
      <button type="button" onClick={handleOnClick}>
        비밀번호 찾기
      </button>
      {modal ? (
        <Alert variant={'dark'}> 비밀번호는 '{yaPwd}'' 입니다.</Alert>
      ) : null}
    </div>
  )
}

export default FindPassword
