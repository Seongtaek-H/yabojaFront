import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import styles from '../css/Menu.module.css'
import { getCookie, removeCookie } from '../utils/cookie'

function Menu() {
  let state = useSelector((state) => state)
  let dispatch = useDispatch()

  let [button, setButton] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (state.yaEmail === '') {
      setButton(true)
    } else {
      setButton(false)
    }
  }, [state])

  return (
    <div className={styles.MenuBarStyle}>
      <div></div>
      <div>
        <Link className={styles.LinkStyle} to="/">
          <span className={styles.logoStyle}>YaboJa!</span>
        </Link>
      </div>
      <div>
        <Link className={styles.LinkStyle} to="/what">
          뭐 볼까?
        </Link>
      </div>
      <div>
        <Link className={styles.LinkStyle} to="/where">
          어디서 볼까?
        </Link>
      </div>
      <div>
        <Link className={styles.LinkStyle} to="/when">
          언제 나오지?
        </Link>
      </div>
      <div className={styles.SearchBarStyle}>
        <Link className={styles.LinkStyle} to="/search">
          검색
        </Link>
      </div>

      {!button ? (
        <div className={styles.MenuEtcStyle}>
          <div>
            <button
              className={styles.logoutBtn}
              onClick={() => {
                removeCookie('jwt')
                dispatch({ type: 'LOGOUT' })
                navigate('/')
              }}
            >
              로그아웃
            </button>
          </div>
          <div>
            <Link className={styles.LinkStyle} to="/me/info">
              마이페이지
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.MenuEtcStyle}>
          <div>
            <Link className={styles.LinkStyle} to="/login">
              로그인
            </Link>
          </div>
          <div>
            <Link className={styles.LinkStyle} to="/join">
              회원가입
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Menu
