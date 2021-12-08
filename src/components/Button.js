import styles from '../css/Button.module.css'

function Button({ text, size}) {
  return (
    <button type="button" style={{width:{size}}} className={styles.ButtonStyle}>
      {text}
    </button>
  )
}

export default Button
