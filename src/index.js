import React from 'react'

import ReactDOM from 'react-dom'
import { combineReducers, createStore } from 'redux'
import App from './App'
import { Provider } from 'react-redux'
import { LOGIN, LOGOUT } from './context/type'

const initialState = {
  yaId: '',
  yaEmail: '',
  yaPwd: '',
  yaName: '',
  yaMyott: [],
  yaMyottS: '',
  yaPhNum: '',
  yaLevel: 0,
  yaPoint: 0,
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      const nickName = action.userData.yaId
      const email = action.userData.yaId
      const password = action.userData.yaId
      const name = action.userData.yaName
      const myOtt = action.userData.yaMyott
      const myOtts = action.userData.yaMyotts
      const ph = action.userData.yaPhNum
      const level = action.userData.yaLevel
      const point = action.userData.yaPoint
      return {
        ...initialState,
        nickName,
        email,
        password,
        name,
        myOtt,
        myOtts,
        ph,
        level,
        point,
      }
    case LOGOUT:
      return { ...initialState }

    default:
      return state
  }
}

let store = createStore(combineReducers({ userReducer }))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
