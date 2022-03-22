import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import styled from 'styled-components'
import { apiAxios } from '../api/axios'

export const FindUserEmail = (Name, PhNum) => {
  const [Email, setEmail] = useState('')
  const [modal, setModal] = useState(false)
  if (Name && PhNum) {
    const findEmail = async () => {
      try {
        const response = await apiAxios.post(
          `/login/findEmail`,
          JSON.stringify({
            Name,
            PhNum,
          })
        )
        setEmail(response.data.Email)
        setModal(true)
      } catch (e) {
        alert('올바른 값이 아닙니다')
        console.error(e.response.error)
      }
    }
    findEmail()
  }
  return Email
}

export const FindPwd = () => {
  const [yaEmail, setYaEmail] = useState('')
  const [yaPhNum, setYaPhNum] = useState('')
  const [yaPwd, setYaPwd] = useState('')
  const [modal, setModal] = useState(false)

  const handleOnClick = () => {
    if (!(yaEmail && yaPhNum)) return
    const findPassword = async () => {
      try {
        const response = await apiAxios.post(
          `/buyus/login/findPwd`,
          JSON.stringify({
            yaEmail,
            yaPhNum,
          })
        )
        console.log('response', response)
        setYaPwd(response.data.yaPwd)
        setModal(true)
      } catch (e) {
        alert('올바른 값이 아닙니다')
        console.error(e.response.error)
      }
    }
    findPassword()
  }
  return <></>
}
