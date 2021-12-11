import { Link } from 'react-router-dom'

import styles from '../css/Menu.module.css'

function Menu() {
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
    </div>
  )
}

export default Menu
