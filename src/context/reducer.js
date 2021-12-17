import { LOGIN, LOGOUT } from './type'

const initialState = {
  yaId: '',
  yaEmail: '',
  yaPwd: '',
  yaName: '',
  yaMyott: [],
  yaMyottS: '',
  yaPhNum: '',
  yaLevel: 0,
  yaPoint: 0,
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      const nickName = action.userData.yaId
      const email = action.userData.yaId
      const password = action.userData.yaId
      const name = action.userData.yaName
      const myOtt = action.userData.yaMyott
      const myOtts = action.userData.yaMyotts
      const ph = action.userData.yaPhNum
      const level = action.userData.yaLevel
      const point = action.userData.yaPoint
      return {
        ...initialState,
        nickName,
        email,
        password,
        name,
        myOtt,
        myOtts,
        ph,
        level,
        point,
      }
    case LOGOUT:
      return { ...initialState }

    default:
      return state
  }
}
