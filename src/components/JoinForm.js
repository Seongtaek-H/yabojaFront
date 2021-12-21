import styles from '../css/JoinForm.module.css'
import { useState } from 'react'
import { apiAxios } from '../api/axios'
import { useNavigate } from 'react-router-dom'

function JoinForm(props) {
  const [yaEmail, setYaEmail] = useState('')
  const [yaPwd, setYaPwd] = useState('')
  const [yaName, setYaName] = useState('')
  const [yaId, setYaId] = useState('')
  const [yaPhNum, setYaPhNum] = useState('')
  const [isCheckEmail, setIsCheckEmail] = useState(false)
  const [isCheckId, setIsCheckId] = useState(false)
  const [checkPwd, setCheckPwd] = useState(false)
  const navigate = useNavigate()

  const [yaMyott, setYaMyott] = useState([])

  const onClickOtt = (checked, ott) => {
    if (checked) {
      setYaMyott([...yaMyott, ott])
    } else {
      setYaMyott(yaMyott.filter((el) => el !== ott))
    }
  }
  const onChangeEmail = (e) => {
    setYaEmail(e.target.value)
    setIsCheckEmail(false)
  }

  const onChangeId = (e) => {
    setYaId(e.target.value)
    setIsCheckId(false)
  }

  const joinData = {
    yaEmail,
    yaPwd,
    yaName,
    yaId,
    yaPhNum,
    yaMyott,
  }

  const checkId = (yaEmail) => {
    return apiAxios.get(`/buyus/join/checkEmail?email=${yaEmail}`)
  }
  const onClickCheckId = async () => {
    try {
      await checkId(yaEmail)
      alert('사용가능한 이메일입니다')
      setIsCheckEmail(true)
    } catch (error) {
      alert('사용 불가한 형식입니다')
      setYaEmail('')
    }
  }

  const checkNickName = (yaId) => {
    return apiAxios.get(`/buyus/join/checkId?id=${yaId}`)
  }
  const onClickCheckNickName = async () => {
    try {
      await checkNickName(yaId)
      setIsCheckId(true)
      alert('사용가능한 닉네임입니다')
    } catch (error) {
      alert('사용 불가한 형식입니다')
      setYaId('')
    }
  }

  const joinUser = () => {
    const result = apiAxios.post('/buyus/join', JSON.stringify(joinData))
    return result
  }

  const onClickJoin = async () => {
    if (!isCheckEmail) return alert('이메일 중복 확인을 해주세요.')
    if (!isCheckId) return alert('닉네임 중복 확인을 해주세요')
    if (!yaEmail) return alert('이메일을 입력해주세요')
    if (!yaPwd) return alert('비밀번호를 입력해주세요')
    if (yaPwd !== checkPwd) return alert('비밀번호가 일치하지 않습니다.')
    if (!yaName) return alert('이름을 입력해주세요')
    if (!yaId) return alert('닉네임을 입력해주세요')
    if (!yaPhNum) return alert('전화번호를 입력해주세요')

    try {
      const response = await joinUser()
      console.log(response)
      navigate('/')
    } catch (error) {
      console.error(error.response)
    }
  }

  return (
    <div className={styles.flexContainer}>
      <label htmlFor="email">이메일</label>
      <div className={styles.fieldContainer}>
        <input
          className={styles.inputStyle}
          type="text"
          value={yaEmail}
          onChange={onChangeEmail}
        />
        <button onClick={onClickCheckId}>중복확인</button>
      </div>
      <label htmlFor="pwd">비밀번호</label>
      <div className={styles.fieldContainer}>
        <input
          className={styles.inputStyle}
          type="password"
          value={yaPwd}
          onChange={(e) => {
            setYaPwd(e.target.value)
          }}
        />
      </div>
      <label htmlFor="pwdCheck">비밀번호 확인</label>
      <div className={styles.fieldContainer}>
        <input
          className={styles.inputStyle}
          type="password"
          onChange={(e) => {
            setCheckPwd(e.target.value)
          }}
        />
      </div>
      {yaPwd !== checkPwd && <div>비밀번호가 일치하지 않습니다</div>}
      <label htmlFor="name">이름</label>
      <div className={styles.fieldContainer}>
        <input
          className={styles.inputStyle}
          type="text"
          value={yaName}
          onChange={(e) => {
            setYaName(e.target.value)
          }}
        />
      </div>
      <label htmlFor="aka">닉네임</label>
      <div className={styles.fieldContainer}>
        <input
          className={styles.inputStyle}
          type="text"
          value={yaId}
          onChange={onChangeId}
        />
        <button onClick={onClickCheckNickName}>중복확인</button>
      </div>
      <label htmlFor="phoneNum">전화번호</label>
      <div className={styles.fieldContainer}>
        <input
          className={styles.inputStyle}
          type="nubmer"
          value={yaPhNum}
          onChange={(e) => {
            if (e.target.value.match(/[^0-9]/g))
              return alert('숫자만 입력 가능합니다')
            setYaPhNum(e.target.value)
          }}
        />
      </div>
      <div className={styles.fieldContainer}>
        <span>구독정보</span>
        <div className={styles.flexContainer2}>
          <div>
            <span>넷플릭스</span>
            <input
              type="checkbox"
              onChange={(e) => {
                onClickOtt(e.currentTarget.checked, 'netflix')
              }}
              checked={yaMyott.includes('netflix') ? true : false}
            />
          </div>
          <div>
            <span>왓챠</span>
            <input
              type="checkbox"
              onChange={(e) => {
                onClickOtt(e.currentTarget.checked, 'watcha')
              }}
              checked={yaMyott.includes('watcha') ? true : false}
            />
          </div>
          <div>
            <span>티빙</span>
            <input
              type="checkbox"
              onChange={(e) => {
                onClickOtt(e.currentTarget.checked, 'tving')
              }}
              checked={yaMyott.includes('tving') ? true : false}
            />
          </div>
          <div>
            <span>웨이브</span>
            <input
              type="checkbox"
              onChange={(e) => {
                onClickOtt(e.currentTarget.checked, 'wavve')
              }}
              checked={yaMyott.includes('wavve') ? true : false}
            />
          </div>
          <div>
            <span>디즈니</span>
            <input
              type="checkbox"
              onChange={(e) => {
                onClickOtt(e.currentTarget.checked, 'disney')
              }}
              checked={yaMyott.includes('disney') ? true : false}
            />
          </div>
        </div>
      </div>

      <div className={styles.joinbtn}>
        <button className={styles.btn} onClick={onClickJoin}>
          회원가입
        </button>
      </div>
    </div>
  )
}

export default JoinForm
