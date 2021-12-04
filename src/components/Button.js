import styles from '../css/Button.module.css'

function Button({ text }) {
  return (
    <button type="button" className={styles.ButtonStyle}>
      {text}
    </button>
  )
}

export default Button
