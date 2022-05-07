import { createSlice } from '@reduxjs/toolkit'
import { getUserFromCookie } from '../utils/cookie'

const initialState = {
  value: getUserFromCookie() ? true : false,
}

export const isLoginSlice = createSlice({
  name: 'isLogin',
  initialState,
  reducers: {
    login: (state) => {
      state.value = true
    },
    logout: (state) => {
      state.value = false
    },
  },
})

export const { login, logout } = isLoginSlice.actions

export default isLoginSlice.reducer
