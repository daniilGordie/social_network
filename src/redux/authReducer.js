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
  console.log(login)
  return {
    type: SET_USER_DATA,
    data: { userID, login, email },
  }
}

export default authReducer
