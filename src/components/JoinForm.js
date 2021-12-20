import styles from '../css/JoinForm.module.css'
import { useState } from 'react'
import { apiAxios } from '../api/axios'
import { useNavigate } from 'react-router-dom'

function JoinForm(props) {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [checkPwd, setCheckPwd] = useState()
  const [name, setName] = useState('')
  const [nickName, setNickName] = useState('')
  const [ph, setPh] = useState('')
  const navigate = useNavigate()

  const [myOtt, setMyOtt] = useState([])

  const inputId = (e) => {
    setId(e.target.value)
  }
  const inputPassword = (e) => {
    setPassword(e.target.value)
  }
  const inputName = (e) => {
    setName(e.target.value)
  }
  const inputNickName = (e) => {
    setNickName(e.target.value)
  }
  const inputPh = (e) => {
    setPh(e.target.value)
  }
  const inputMyOtt = (checked, ott) => {
    if (checked) {
      setMyOtt([...myOtt, ott])
    } else {
      setMyOtt(myOtt.filter((el) => el !== ott))
    }
  }

  const joinData = {
    yaEmail: id,
    yaPwd: password,
    yaName: name,
    yaId: nickName,
    yaPhNum: ph,
    yaMyott: myOtt,
  }

  const joinUser = async () => {
    const result = await apiAxios.post('/buyus/join', JSON.stringify(joinData))
    return result
  }

  const onClickJoin = async () => {
    try {
      const response = await joinUser()
      console.log(response)
      navigate('/')
    } catch (error) {
      console.error(error.response)
    }
  }

  const checkId = (id) => {
    return apiAxios.get(`/join/checkEmail?email=${id}`)
  }
  const onClickCheckId = async () => {
    try {
      await checkId(id)
      alert('사용가능한 이메일입니다')
    } catch (error) {
      alert('사용 불가한 형식입니다')
      setId('')
    }
  }

  const checkNickName = (nickName) => {
    return apiAxios.get(`/join/checkId?id=${nickName}`)
  }
  const onClickCheckNickName = async () => {
    try {
      await checkNickName(nickName)
      alert('사용가능한 닉네임입니다')
    } catch (error) {
      alert('사용 불가한 형식입니다')
      setNickName('')
    }
  }

  return (
    <div className={styles.flexContainer}>
      <form autocomplete="off">
        <label htmlFor="email">이메일</label>
        <div className={styles.fieldContainer}>
          <input
            className={styles.inputStyle}
            id="email"
            type="text"
            value={id}
            onChange={inputId}
          />
          <button onClick={checkId}>중복확인</button>
        </div>
        <label htmlFor="pwd">비밀번호</label>
        <div className={styles.fieldContainer}>
          <input
            className={styles.inputStyle}
            id="password"
            type="password"
            value={password}
            onChange={inputPassword}
          />
        </div>
        <label htmlFor="pwdCheck">비밀번호 확인</label>
        <div className={styles.fieldContainer}>
          <input
            className={styles.inputStyle}
            id="pwdCheck"
            type="password"
            value={checkPwd}
          />
        </div>
        <label htmlFor="name">이름</label>
        <div className={styles.fieldContainer}>
          <input
            className={styles.inputStyle}
            id="name"
            type="text"
            value={name}
            onChange={inputName}
          />
        </div>
        {}
        <label htmlFor="aka">닉네임</label>
        <div className={styles.fieldContainer}>
          <input
            className={styles.inputStyle}
            id="nickName"
            type="text"
            value={nickName}
            onChange={inputNickName}
          />
          <button onClick={checkNickName}>중복확인</button>
        </div>
        <label htmlFor="phoneNum">전화번호</label>
        <div className={styles.fieldContainer}>
          <input
            className={styles.inputStyle}
            id="Ph"
            type="text"
            value={ph}
            onChange={inputPh}
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
                  inputMyOtt(e.currentTarget.checked, 'netflix')
                }}
                checked={myOtt.includes('netflix') ? true : false}
              />
            </div>
            <div>
              <span>왓챠</span>
              <input
                type="checkbox"
                onChange={(e) => {
                  inputMyOtt(e.currentTarget.checked, 'watcha')
                }}
                checked={myOtt.includes('watcha') ? true : false}
              />
            </div>
            <div>
              <span>티빙</span>
              <input
                type="checkbox"
                onChange={(e) => {
                  inputMyOtt(e.currentTarget.checked, 'Tving')
                }}
                checked={myOtt.includes('Tving') ? true : false}
              />
            </div>
            <div>
              <span>웨이브</span>
              <input
                type="checkbox"
                onChange={(e) => {
                  inputMyOtt(e.currentTarget.checked, 'wavve')
                }}
                checked={myOtt.includes('wavve') ? true : false}
              />
            </div>
            <div>
              <span>디즈니</span>
              <input
                type="checkbox"
                onChange={(e) => {
                  inputMyOtt(e.currentTarget.checked, 'Desney')
                }}
                checked={myOtt.includes('Desney') ? true : false}
              />
            </div>
          </div>
        </div>

        <div>
          <button className={styles.btn} onClick={onClickJoin}>
            회원가입
          </button>
        </div>
      </form>
    </div>
  )
}

export default JoinForm
