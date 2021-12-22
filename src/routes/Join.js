import JoinForm from '../components/JoinForm'
import Menu from '../components/Menu'
import styles from '../css/Join.module.css'

function Join() {
  return (
    <div>
      <Menu></Menu>
      <div className={styles.blank}></div>
      <span className={styles.title}>회원가입</span>
      <div class={styles.flexContainer}>
        <div class={styles.sec}>
            <JoinForm />
        </div>
      </div>
    </div>
  )
}

export default Join
