import axios from 'axios'
import { getCookie } from '../utils/cookie'
import { API_HOST } from './api_host'

const cookie = getCookie('token')
console.log(cookie)
export const apiAxios = axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: `Bearer ${cookie}`,
  },
})
