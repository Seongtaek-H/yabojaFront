import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
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

export default function userReducer(state = initialState, action) {
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

const persistConfig = {
  key: 'root',
  storage,
}

const persisted = persistReducer(persistConfig, userReducer)

const store = createStore(persisted)

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
