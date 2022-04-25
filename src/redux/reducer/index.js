import { LOGIN, LOGOUT } from '../type'

const initialState = {
  id: 0,
  email: '',
  password: '',
  name: '',
  nickName: '',
  phoneNumber: '',
  createAt: '',
  isValid: false,
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      const id = ''
      const email = ''
      const password = ''
      const name = ''
      const nickName = ''
      const phoneNumber = ''
      const createAt = ''
      const isValid = ''
      return {
        ...initialState,
        id,
        email,
        password,
        name,
        nickName,
        phoneNumber,
        createAt,
        isValid,
      }
    case LOGOUT:
      return { ...initialState }

    default:
      return state
  }
}
