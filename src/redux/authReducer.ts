import { authAPI, securityAPI, ResultCodeEnum } from '../api/api.ts'

const SET_USER_DATA = 'SET_USER_DATA'
const IS_SUBMIT_SUCCES = 'IS_SUBMIT_SUCCES'
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'

export type InitialStateType = {
  login: string | null
  userID: number | null
  email: string | null
  isAuth: boolean | null
  rememberMe: boolean | null
  isSubmitSuccess: boolean | null
  captchaURL: string | null
}

const initialState: InitialStateType = {
  login: null,
  userID: null,
  email: null,
  isAuth: false,
  rememberMe: false,
  isSubmitSuccess: true,
  captchaURL: null, // if null captcha using is not required
}

export const authReducer = (state = initialState, action: any): InitialStateType => {
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

type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA
  data: SetAuthUserDataActionPayloadType
}

type SetAuthUserDataActionPayloadType = {
  userID: number | null
  login: string | null
  email: string | null
  isAuth: boolean
}

const setAuthUserData = (
  userID: number | null,
  login: string | null,
  email: string | null,
  isAuth: boolean
): SetAuthUserDataActionType => {
  return {
    type: SET_USER_DATA,
    data: { userID, login, email, isAuth },
  }
}

type SetSubmitSuccessActionType = {
  type: typeof IS_SUBMIT_SUCCES
  isSubmitSuccess: boolean
}

const setSubmitSucces = (isSubmit: boolean): SetSubmitSuccessActionType => {
  return {
    type: IS_SUBMIT_SUCCES,
    isSubmitSuccess: isSubmit,
  }
}

type GetCaptchaURLSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS
  captchaURL: string
}

const getCaptchaURLSuccess = (url: string): GetCaptchaURLSuccessActionType => {
  return {
    type: GET_CAPTCHA_URL_SUCCESS,
    captchaURL: url,
  }
}

export const getAuthUserData = () => async (dispatch: any) => {
  const response = await authAPI.me()
  if (response.data.resultCode === ResultCodeEnum.Success) {
    const { id, login, email } = response.data.data
    dispatch(setAuthUserData(id, login, email, true))
  }
}

// type setLoginTunkType = {

// }

export const setLogin =
  (email: string, password: string, rememberMe: boolean, setNav: Function, captcha = null) =>
  async (dispatch: any) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === ResultCodeEnum.Success) {
      dispatch(getAuthUserData())
      dispatch(setSubmitSucces(true))
      setNav()
    } else {
      if (response.data.resultCode === ResultCodeEnum.CaptchaIsRequired) {
        dispatch(getCaptchaURL())
      }
      dispatch(setSubmitSucces(false))
    }
  }

export const setLogout = () => async (dispatch: any) => {
  const response = await authAPI.logout()
  if (response.data.resultCode === ResultCodeEnum.Success) {
    dispatch(setAuthUserData(null, null, null, false))
  }
}

const getCaptchaURL = () => async (dispatch: any) => {
  const response = await securityAPI.getCaptcha()
  const captchaURL = response.data.url
  dispatch(getCaptchaURLSuccess(captchaURL))
}

export default authReducer
