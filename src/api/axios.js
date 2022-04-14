import axios from 'axios'
import { API_HOST } from './api_host'
// import { getCookie } from '../utils/cookie'

export const apiAxios = axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    // Authorization: `Bearer ${getCookie('jwt')}`,
  },
})
