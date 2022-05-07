import { useState } from 'react'

function DeleteUser() {
  const [yaPwd, setYaPwd] = useState('')
  console.log(yaPwd)
  return (
    <div>
      <div>탈퇴하시겠습니까?</div>
      <input
        type="text"
        value={yaPwd}
        placeholder="비밀번호를 입력해주세요"
        onChange={(e) => {
          setYaPwd(e.target.value)
        }}
      />
    </div>
  )
}

export default DeleteUser
