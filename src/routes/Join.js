import JoinForm from '../components/JoinForm'
import Button from '../components/Button'
import styles from '../css/Join.module.css'
import React, { useState } from 'react'

function Join() {
  const [joinData, setJdoinData] = useState()
  console.log(joinData)
  return (
    <div class={styles.gridContainer}>
      <div></div>
      <div class={styles.sec2}>
        <div class={styles.center}></div>
        <div class={styles.center}>
          <JoinForm joinData={joinData} />
        </div>
        <div class={styles.center}></div>
      </div>
      <div></div>
    </div>
  )
}

export default Join
