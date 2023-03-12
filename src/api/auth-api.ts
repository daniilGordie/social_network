import { instanse, ResponseType } from './api.ts'

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
    return instanse.get<ResponseType<MeResponseDataType>>(`auth/me`).then((res) => res.data)
  },
  login(email: string, password: string, captcha: null | string = null) {
    return instanse
      .post<ResponseType<LoginResponseType>>(`auth/login`, {
        email,
        password,
        captcha,
      })
      .then((res) => res.data)
  },
  logout() {
    return instanse.delete(`auth/login`).then((res) => res.data)
  },
}
