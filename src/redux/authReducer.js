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
        ...state.data,
        isAuth: true,
      }

    default:
      return state
  }
}

export const setAuthUserData = (userID, login, email) => {
  return {
    type: SET_USER_DATA,
    data: { userID, login, email },
  }
}

export default authReducer
