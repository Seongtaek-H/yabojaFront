import styles from '../css/Button.module.css'

function Button({ type, text, size}) {
  return (
    <button type={type} style={{width:{size}}} className={styles.ButtonStyle}>
      {text}
    </button>
  )
}

export default Button
