import React from 'react'
import ReactDOM from 'react-dom'
import { combineReducers, createStore } from 'redux'
import App from './App'
import { Provider } from 'react-redux'
import { LOGIN, LOGOUT } from './redux/type'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/es/persistReducer'
import { PersistGate } from 'redux-persist/integration/react'

const initialState = {
  id: 0,
  email: '',
  password: '',
  name: '',
  nickNmae: '',
  phoneNumber: '',
  createdAt: '',
  isValid: false,
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      const id = action.payload.id
      const email = action.payload.email
      const password = action.payload.password
      const name = action.payload.name
      const nickName = action.payload.nickName
      const phoneNumber = action.payload.phonNumber
      const createAt = action.payload.createAt
      const isValid = action.payload.isValid
      return {
        ...initialState,
        id,
        email,
        password,
        name,
        nickName,
        phoneNumber,
        createAt,
        isValid,
      }
    case LOGOUT:
      return { ...initialState }

    default:
      return state
  }
}

export function userToken(state = '', action) {
  if (action.type === 'token') {
    console.log(action)
    const cookie = action.payload
    return cookie
  } else {
    const cookie = ''
    return cookie
  }
}

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({ userReducer, userToken })
const persisted = persistReducer(persistConfig, rootReducer)

export const store = createStore(persisted)

const persistor = persistStore(store)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
