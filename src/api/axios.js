import axios from 'axios'
// import { getCookie } from '../utils/cookie'

export const apiAxios = axios.create({
  // baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    // Authorization: `Bearer ${getCookie('jwt')}`,
  },
})
