import React from 'react'

import ReactDOM from 'react-dom'
import { combineReducers, createStore } from 'redux'
import App from './App'
import { Provider } from 'react-redux'
import { LOGIN, LOGOUT } from './context/type'

const initialState = {
  yaId: '',
  yaEmail: '',
  yaName: '',
  yaMyott: [],
  yaPhNum: '',
  yaLevel: 0,
  yaPoint: 0,
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      const copy = {
        nickName: action.userData.yaId,
        email: action.userData.yaId,
        name: action.userData.yaName,
        myOtt: action.userData.yaMyott,
        ph: action.userData.yaPhNum,
        level: action.userData.yaLevel,
        point: action.userData.yaPoint,
      }

      return copy

    case LOGOUT:
      return { ...initialState }

    default:
      return state
  }
}

let store = createStore(userReducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
