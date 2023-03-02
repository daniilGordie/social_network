import { BaseThunkType, InferActionTypes } from './redux-store'
import { ResultCodeEnum } from '../api/api.ts'
import { authAPI } from '../api/auth-api.ts'
import { securityAPI } from '../api/security-api.ts'

const SET_USER_DATA = 'sn/auth/SET_USER_DATA'
const IS_SUBMIT_SUCCES = 'sn/auth/IS_SUBMIT_SUCCES'
const GET_CAPTCHA_URL_SUCCESS = 'sn/auth/GET_CAPTCHA_URL_SUCCESS'

export type InitialStateType = {
  login: string | null
  userID: number | null
  email: string | null
  isAuth: boolean | null
  rememberMe: boolean | null
  isSubmitSuccess: boolean | null
  captchaURL: string | null
}

type ActionTypes = InferActionTypes<typeof actions>

type ThunkType = BaseThunkType<ActionTypes>

const initialState: InitialStateType = {
  login: null,
  userID: null,
  email: null,
  isAuth: false,
  rememberMe: false,
  isSubmitSuccess: true,
  captchaURL: null, // if null captcha using is not required
}

export const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
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
        isSubmitSuccess: action.isSubmitSuccess,
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

export const actions = {
  setAuthUserData: (
    userID: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean
  ) =>
    ({
      type: SET_USER_DATA,
      data: { userID, login, email, isAuth },
    } as const),
  setSubmitSucces: (isSubmit: boolean) =>
    ({
      type: IS_SUBMIT_SUCCES,
      isSubmitSuccess: isSubmit,
    } as const),
  getCaptchaURLSuccess: (url: string) =>
    ({
      type: GET_CAPTCHA_URL_SUCCESS,
      captchaURL: url,
    } as const),
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const response = await authAPI.me()
  if (response.data.resultCode === ResultCodeEnum.Success) {
    const { id, login, email } = response.data.data
    dispatch(actions.setAuthUserData(id, login, email, true))
  }
}

export const setLogin =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    setNav: Function,
    captcha = null
  ): ThunkType =>
  async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === ResultCodeEnum.Success) {
      dispatch(getAuthUserData())
      dispatch(actions.setSubmitSucces(true))
      setNav()
    } else {
      if (response.data.resultCode === ResultCodeEnum.CaptchaIsRequired) {
        dispatch(getCaptchaURL())
      }
      dispatch(actions.setSubmitSucces(false))
    }
  }

export const setLogout = (): ThunkType => async (dispatch) => {
  const response = await authAPI.logout()
  if (response.data.resultCode === ResultCodeEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false))
  }
}

const getCaptchaURL = (): ThunkType => async (dispatch) => {
  const response = await securityAPI.getCaptcha()
  const captchaURL = response.data.url
  dispatch(actions.getCaptchaURLSuccess(captchaURL))
}

export default authReducer
