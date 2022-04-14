import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import App from './App'
import { Provider } from 'react-redux'
import { LOGIN, LOGOUT } from './context/type'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/es/persistReducer'
import logger from 'redux-logger'
import { PersistGate } from 'redux-persist/integration/react'

const initialState = {
  id: '',
  email: '',
  password: '',
  name: '',
  nickNmae: '',
  phoneNumber: '',
  createdAt: '',
  isValid: '',
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      const copy = {
        id: action.userData.Id,
        email: action.userData.Email,
        name: action.userData.Name,
        phNum: action.userData.PhNum,
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

const persisted = persistReducer(persistConfig, userReducer)

const store = createStore(persisted, compose(applyMiddleware(logger)))

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
