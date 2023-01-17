import { authAPI } from '../api/api'

const SET_USER_DATA = 'SET_USER_DATA'
const IS_SUBMIT_SUCCES = 'IS_SUBMIT_SUCCES'

const initialState = {
  login: null,
  userID: null,
  email: null,
  isAuth: false,
  isSubmitSucces: true,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        login: action.data.login,
        isAuth: action.isAuth,
      }
    case IS_SUBMIT_SUCCES:
      return {
        ...state,
        isSubmitSucces: action.isSubmitSucces,
      }
    default:
      return state
  }
}

const setAuthUserData = ({ userID, login, email }, isAuth) => {
  return {
    type: SET_USER_DATA,
    data: { userID, login, email },
    isAuth: isAuth,
  }
}

const setSubmitSucces = (isSubmit) => {
  return {
    type: IS_SUBMIT_SUCCES,
    isSubmitSucces: isSubmit,
  }
}

export const getAuthUserData = () => (dispatch) => {
  authAPI.me().then((response) => {
    if (response.data.resultCode === 0) {
      const { id, login, email } = response.data.data
      dispatch(setAuthUserData({ userID: id, login, email }, true))
    }
  })
}

export const setLogin = (email, password, rememberMe) => (dispatch) => {
  authAPI.login(email, password, rememberMe).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData())
      dispatch(setSubmitSucces(true))
    } else {
      dispatch(setSubmitSucces(false))
    }
  })
}

export const setLogout = () => (dispatch) => {
  authAPI.logout().then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData({ userID: null, login: null, email: null, isAuth: false }))
    }
  })
}

export default authReducer
