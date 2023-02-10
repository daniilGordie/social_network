import { authAPI, securityAPI } from '../api/api'

const SET_USER_DATA = 'SET_USER_DATA'
const IS_SUBMIT_SUCCES = 'IS_SUBMIT_SUCCES'
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'

const initialState = {
  login: null,
  userID: null,
  email: null,
  isAuth: false,
  rememberMe: false,
  isSubmitSucces: true,
  captchaURL: null, // if null captcha using is not required
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
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        captchaURL: action.captchaURL,
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

const getCaptchaURLSuccess = (url) => {
  return {
    type: GET_CAPTCHA_URL_SUCCESS,
    captchaURL: url,
  }
}

export const getAuthUserData = () => async (dispatch) => {
  const response = await authAPI.me()
  if (response.data.resultCode === 0) {
    const { id, login, email } = response.data.data
    dispatch(setAuthUserData({ userID: id, login, email }, true))
  }
}

export const setLogin =
  (email, password, rememberMe, setNav, captcha = null) =>
  async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData())
      dispatch(setSubmitSucces(true))
      setNav()
    } else {
      if (response.data.resultCode === 10) {
        dispatch(getCaptchaURL())
      }
      dispatch(setSubmitSucces(false))
    }
  }

export const setLogout = () => async (dispatch) => {
  const response = await authAPI.logout()
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData({ userID: null, login: null, email: null, isAuth: false }))
  }
}

const getCaptchaURL = () => async (dispatch) => {
  const response = await securityAPI.getCaptcha()
  const captchaURL = response.data.url
  dispatch(getCaptchaURLSuccess(captchaURL))
}

export default authReducer
