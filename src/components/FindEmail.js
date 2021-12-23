import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import styled from 'styled-components'
import { apiAxios } from '../api/axios'
import styles from '../css/Find.module.css'

const FindEmail = () => {
  const [yaName, setYaName] = useState('')
  const [yaEmail, setYaEmail] = useState('')
  const [modal, setModal] = useState(false)

  const handleOnClick = () => {
    if (!yaName) return
    const findEmail = async () => {
      try {
        const response = await apiAxios.post(
          `/buyus/login/findEmail`,
          JSON.stringify({
            yaName,
          })
        )
        setYaEmail(response.data.yaEmail)
        setModal(true)
        console.log('response', response)
      } catch (e) {
        alert('올바른 값이 아닙니다')
        console.error(e.response.error)
      }
    }
    findEmail()
  }
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.gridContainer}>
          <div>
            <div className={styles.name}>이름</div>
            <input
              type="text"
              autoComplete="off"
              className={styles.inputStyle}
              value={yaName}
              placeholder="이름을 입력해주세요"
              onChange={(e) => {
                setYaName(e.target.value)
              }}
            />
          </div>
        </div>
        <div className={styles.btnBox}>
          <button className={styles.btn} type="button" onClick={handleOnClick}>
            이메일 찾기
          </button>
        </div>
      </div>
      {modal ? (
        <Alert variant={'dark'}> 이메일은 '{yaEmail}'' 입니다.</Alert>
      ) : null}
    </div>
  )
}

export default FindEmail
