import axios from 'axios'

const API_HOST = 'https://movie-review-app-server.herokuapp.com/api'

const instance = axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: `Bearer test1234`,
  },
})

// 회원가입 관련 메서드

function registerUser(joinData) {
  return instance.post('/user', JSON.stringify(joinData))
}

function checkEmail(email) {
  return instance.get(`/user/identities?type="email"&value=${email}`)
}

function checkNickName(nickName) {
  return instance.get(`/user/identities?type="nickName"&value=${nickName}`)
}

export { registerUser, checkEmail, checkNickName }
