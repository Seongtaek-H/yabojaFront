import axios from 'axios'
import { API_HOST } from '../constants'

export const apiAxios = axios.create({
  // baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})
