import axios from 'axios'
import { URL } from '_utils/api'
import { apiAxios } from '../api/axios'
import { setCookie } from '../utils/cookie'
import { LOGIN, LOGOUT } from './type'

export function loginUser(loginData) {
  return function (dispatch) {
    try {
      const response = apiAxios.post('/buyus/login', JSON.stringify(loginData))
      if (response.data.jwt) {
        setCookie('jwt', response.data.jwt, {
          path: '/',
          secure: true,
          sameSite: 'none',
        })
      }
      const userData = response.data.resultVO
      return dispatch({
        type: LOGIN,
        loginData,
        userData,
      })
      // redux thunk
      // 디스패치로 response 값 받아와서 스토어 값 수정
    } catch (error) {
      console.error(error.response)
      dispatch({
        type: LOGIN,
        error: error.response,
      })
      // 에러메시지에 따라서 if문으로 나누거나 그냥 띄우거나
    }
  }
}

export function logoutUser() {
  return {
    type: LOGOUT,
  }
}
