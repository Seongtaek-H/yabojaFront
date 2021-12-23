import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import FindEmail from '../components/FindEmail'
import FindPassword from '../components/FindPassword'
import styled from 'styled-components'
import styles from '../css/Find.module.css'
import Login from './Login'

const FindUserInfo = (props) => {
  return (
    <div className="container">
      <Tabs id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="email" title="이메일찾기">
          <FindEmail />
        </Tab>

        <Tab eventKey="password" title="비밀번호찾기">
          <FindPassword />
        </Tab>
      </Tabs>
      <바디>
        <button
          onClick={() => {
            props.setShowModal(false)
          }}
        >
          닫기
        </button>
      </바디>
    </div>
  )
}

let 바디 = styled.div`
  margin-top: 40%;
  margin-left: 46%;
`
export default FindUserInfo
