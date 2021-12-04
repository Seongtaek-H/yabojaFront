import axios from 'axios'

export const loginUser = async ({ id, password }) => {
  await axios.post(`/login`, { id, password })
  // jwt토큰 쿠키에 저장
}

export const joinUser = async({})
