import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import FindEmail from '../components/FindEmail'
import FindPassword from '../components/FindPassword'
import Menu from '../components/Menu'
import styled from 'styled-components'

const FindUserInfo = () => {
  return (
    <div>
      <박스></박스>

      <Tabs id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="email" title="이메일찾기">
          <FindEmail />
        </Tab>

        <Tab eventKey="password" title="비밀번호찾기">
          <FindPassword />
        </Tab>
      </Tabs>
    </div>
  )
}
let 박스 = styled.div`
  margin-top: 100px;
`
export default FindUserInfo
