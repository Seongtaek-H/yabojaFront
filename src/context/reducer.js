import { LOGIN, LOGOUT } from './type'

const initialState = {
  num: 0,
  avatar: '',
  name: '',
  host: 'N',
  auth: false,
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      const userNum = action.userData.userNum
      const host = action.userData.host
      const avatar = action.APIdata.img
      const name = action.userData.name
      const auth = true
      return {
        ...initialState,
        num: userNum,
        avatar: avatar,
        name: name,
        host: host,
        auth: auth,
      }
    case LOGOUT:
      return { ...initialState }

    default:
      return state
  }
}
