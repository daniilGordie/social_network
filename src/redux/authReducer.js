import { authAPI } from '../api/api'

const SET_USER_DATA = 'SET_USER_DATA'

const initialState = {
  login: null,
  userID: null,
  email: 'samuray',
  isAuth: false,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        login: action.data.login,
        isAuth: true,
      }

    default:
      return state
  }
}

export const setAuthUserData = ({ userID, login, email }) => {
  return {
    type: SET_USER_DATA,
    data: { userID, login, email },
  }
}

export const getAuthUserData = () => (dispatch) => {
  authAPI.me().then((response) => {
    if (response.data.resultCode === 0) {
      const { id, login, email } = response.data.data
      dispatch(setAuthUserData({ userID: id, login, email }))
    }
  })
}

export default authReducer
