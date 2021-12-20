import React from 'react'

import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import App from './App'
import { Provider } from 'react-redux'
import { LOGIN, LOGOUT } from './context/type'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/es/persistReducer'

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
        yaId: action.userData.yaId,
        yaEmail: action.userData.yaEmail,
        yaName: action.userData.yaName,
        yaMyott: action.userData.yaMyott,
        yaPhNum: action.userData.yaPhNum,
        yaLevel: action.userData.yaLevel,
        yaPoint: action.userData.yaPoint,
      }

      return copy

    case LOGOUT:
      return { ...initialState }

    default:
      return state
  }
}

const persistConfig = {
  key: 'root',
  storage,
}

// const persisted = persistReducer(persistConfig, Reducer)

const store = createStore(userReducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
