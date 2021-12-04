import Button from './Button'
import styles from '../css/JoinForm.module.css'

function JoinForm() {
  return (
    <div className={styles.flexContainer}>
      <form autocomplete="off">
        <label htmlFor="email">이메일</label>
        <div className={styles.fieldContainer}>
          <input className={styles.inputStyle} id="email" type="text" />
          <Button text={'중복확인'} />
        </div>
        <label htmlFor="pwd">비밀번호</label>
        <div className={styles.fieldContainer}>
          <input className={styles.inputStyle} id="pwd" type="text" />
        </div>
        <label htmlFor="pwdCheck">비밀번호 확인</label>
        <div className={styles.fieldContainer}>
          <input className={styles.inputStyle} id="pwdCheck" type="text" />
        </div>
        <label htmlFor="name">이름</label>
        <div className={styles.fieldContainer}>
          <input className={styles.inputStyle} id="name" type="text" />
        </div>
        <label htmlFor="aka">닉네임</label>
        <div className={styles.fieldContainer}>
          <input className={styles.inputStyle} id="aka" type="text" />
          <Button text={'중복확인'} />
        </div>
        <label htmlFor="phoneNum">전화번호</label>
        <div className={styles.fieldContainer}>
          <input className={styles.inputStyle} id="phoneNum" type="text" />
        </div>
        <div>
          <span>구독정보</span>
          <div className={styles.flexContainer2}>
            <div>
              <span>넷플릭스</span>
              <input type="checkbox" />
            </div>
            <div>
              <span>넷플릭스</span>
              <input type="checkbox" />
            </div>
            <div>
              <span>넷플릭스</span>
              <input type="checkbox" />
            </div>
            <div>
              <span>넷플릭스</span>
              <input type="checkbox" />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default JoinForm
