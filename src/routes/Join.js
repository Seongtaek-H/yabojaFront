import JoinForm from "../components/JoinForm";
import Title from "../components/Title";
import Button from "../components/Button";
import styles from "../css/App.module.css";

function Join() {
  return (
    <div class={styles.gridContainer}>
      <div > 
      </div>
      <div class={styles.sec2}>
        <div class={styles.center}>
        <Title />
        </div>
        <div class={styles.center}>
        <JoinForm />
        </div>
        <div class={styles.center}>
        <Button text={"회원가입"}/>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Join;
