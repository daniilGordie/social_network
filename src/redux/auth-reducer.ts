import { BaseThunkType, InferActionTypes } from './redux-store'
import { ResultCodeEnum } from '../api/api.ts'
import { authAPI } from '../api/auth-api.ts'
import { securityAPI } from '../api/security-api.ts'

const SET_USER_DATA = 'sn/auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'sn/auth/GET_CAPTCHA_URL_SUCCESS'

export type InitialStateType = typeof initialState
type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>

const initialState = {
  login: null as string | null,
  userID: null as number | null,
  email: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null, // if null captcha using is not required
}

const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload,
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
      payload: { userID, login, email, isAuth },
    } as const),
  getCaptchaURLSuccess: (url: string) =>
    ({
      type: GET_CAPTCHA_URL_SUCCESS,
      payload: { url },
    } as const),
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const response = await authAPI.me()

  if (response.resultCode === ResultCodeEnum.Success) {
    const { id, login, email } = response.data
    dispatch(actions.setAuthUserData(id, login, email, true))
  }
}

export const setLogin =
  (email: string, password: string, captcha: string): ThunkType =>
  async (dispatch) => {
    const response = await authAPI.login(email, password, captcha)
    if (response.resultCode === ResultCodeEnum.Success) {
      dispatch(getAuthUserData())
    } else {
      if (response.resultCode === ResultCodeEnum.CaptchaIsRequired) {
        dispatch(getCaptchaURL())
      }
    }
  }

export const setLogout = (): ThunkType => async (dispatch) => {
  const response = await authAPI.logout()
  if (response.resultCode === ResultCodeEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false))
  }
}

const getCaptchaURL = (): ThunkType => async (dispatch) => {
  const response = await securityAPI.getCaptcha()
  const url = response.url
  dispatch(actions.getCaptchaURLSuccess(url))
}

export default authReducer
