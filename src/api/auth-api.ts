import { instanse } from './api.ts'
import { ResponseType } from './api.ts'

type MeResponseDataType = {
  id: number
  email: string
  login: string
}

type LoginResponseType = {
  id: number
}

export const authAPI = {
  me() {
    return instanse.get<ResponseType<MeResponseDataType>>(`auth/me`)
  },
  login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    return instanse.post<ResponseType<LoginResponseType>>(`auth/login`, {
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
