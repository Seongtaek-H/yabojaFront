import axios from 'axios'
import { setInterceptors } from './interceptors'

const API_HOST = 'https://movie-review-app-server.herokuapp.com/api'

// 토큰값 필요없는 api

const instance = axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
})

// 토큰값 필요한 api

function getInstancewithAuth() {
  const instance = axios.create({
    baseURL: API_HOST,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })
  return setInterceptors(instance)
}

const instanceWithAuth = getInstancewithAuth()

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

// 로그인 메서드

function loginUser(loginData) {
  return instance.post('/auth/login', JSON.stringify(loginData))
}

// 사용자 데이터 가져오기 관련 메서드
function getUser() {
  return instanceWithAuth.get('auth/me')
}

// get review (사용자별)
function getReviewsWithId(userIdNum) {
  return instanceWithAuth.get(`/review?id=${userIdNum}`)
}

// get review (콘텐츠별)
function getReview(id, type) {
  return instanceWithAuth.get(`/review?targetId=${id}&targetType=${type}`)
}

// review 작성하기
function createReview(data) {
  return instanceWithAuth.post(`/review`, JSON.stringify(data))
}

// 회원정보 찾기 관련 메서드
function findEmail(name, phNum) {
  return instance.post(
    '/login/findEmail',
    JSON.stringify({
      name,
      phNum,
    })
  )
}

export {
  registerUser,
  checkEmail,
  checkNickName,
  loginUser,
  getUser,
  getReview,
  getReviewsWithId,
  createReview,
  findEmail,
}
