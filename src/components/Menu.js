import React from "react";
import { Link } from "react-router-dom";

import styles from "../css/Menu.module.css";

function Menu() {
  return (
    <div className={styles.MenuBarStyle}>
      <div></div>
      <div>
        <Link className={styles.LinkStyle} to="/">야보자! 이거어때?</Link>
      </div>
      <div>
        <Link className={styles.LinkStyle} to="/what">뭐 볼까?</Link>
      </div>
      <div>
        <Link className={styles.LinkStyle} to="/where">어디서 볼까?</Link>
        </div>
      <div>
        <Link className={styles.LinkStyle} to="/when">언제 나오지?</Link>
      </div>
      <div className={styles.SearchBarStyle}>
          <input type="text"/>
          <i class="fas fa-search"></i>
      </div>
      <div className={styles.MenuEtcStyle}>
        <div>
          <Link className={styles.LinkStyle} to="/login">로그인</Link>
        </div>
        <div>
          <Link className={styles.LinkStyle} to="/join">회원가입</Link>
        </div>
      </div>
    </div>
  );
}

export default Menu; 