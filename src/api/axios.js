import axios from 'axios'
import { API_HOST } from '../constants'
import { getCookie } from '../utils/cookie'

export const apiAxios = axios.create({
  // baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${getCookie('jwt')}`,
  },
})
