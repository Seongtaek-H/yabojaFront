import { apiAxios } from '../api/axios'
import { setCookie } from '../utils/cookie'
import { LOGIN, LOGOUT } from './type'

export function login(loginData) {
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
    } catch (error) {
      console.error(error.response)
      dispatch({
        type: LOGIN,
        error: error.response,
      })
    }
  }
}

export function logout() {
  return {
    type: LOGOUT,
  }
}
