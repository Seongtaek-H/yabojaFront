import { configureStore } from '@reduxjs/toolkit'
import isLoginReducer from './isLoginSlice'

export const store = configureStore({
  reducer: {
    isLogin: isLoginReducer,
  },
})
