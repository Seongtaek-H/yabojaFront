import JoinForm from '../components/JoinForm'
import Menu from '../components/Menu'
import styles from '../css/Join.module.css'

function Join() {
  return (
    <div>
      <Menu></Menu>
      <div class={styles.gridContainer}>
        <div></div>
        <div class={styles.sec2}>
          <div class={styles.center}></div>
          <div class={styles.center}>
            <JoinForm />
          </div>
          <div class={styles.center}></div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Join
