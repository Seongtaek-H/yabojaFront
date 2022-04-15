import axios from 'axios'
import { API_HOST } from './api_host'

export const apiAxios = axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
})
