import React from 'react'

import ReactDOM from 'react-dom'
import { combineReducers, createStore } from 'redux'
import App from './App'
import reducer from './context/reducer'
import { Provider } from 'react-redux'

let store = createStore(combineReducers({ reducer }))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
