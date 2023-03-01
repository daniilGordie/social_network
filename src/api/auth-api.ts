import { instanse } from './api.ts'
import { ResultCodeEnum } from './api.ts'

type MeResponseType = {
  data: {
    id: number
    email: string
    login: string
  }
  resultCode: ResultCodeEnum
  messages: Array<string>
}

type LoginResponseType = {
  data: {
    id: number
  }
  resultCode: ResultCodeEnum
  messages: Array<string>
}

export const authAPI = {
  me() {
    return instanse.get<MeResponseType>(`auth/me`)
  },
  login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    return instanse.post<LoginResponseType>(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    })
  },
  logout() {
    return instanse.delete(`auth/login`)
  },
}
