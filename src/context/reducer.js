import React from 'react'

let 초기값 = [{ id: 'ya_email', pwd: 'ya_pwd' }]
function reducer(state = 초기값, 액션) {
  if (액션.type === 'login') {
    let loginData = ''
    return loginData
  }
  return state
}

export default reducer
