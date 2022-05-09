import axios from 'axios'
import { getAuthFromCookie } from '../utils/cookie'

const API_HOST = 'https://movie-review-app-server.herokuapp.com/api'

const apiAxios = axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
})

apiAxios.interceptors.request.use(
  function (config) {
    // 요청을 보내기 전에 어떤 처리를 할 수 있다.
    const token = getAuthFromCookie()
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  function (error) {
    // 요청이 잘못되었을 때 에러가 컴포넌트 단으로 오기 전에 어떤 처리를 할 수 있다.
    return Promise.reject(error)
  }
)

export default apiAxios
