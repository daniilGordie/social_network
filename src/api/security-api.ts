import { instanse } from './api.ts'

type GetCaptchaURLType = {
  url: string
}

export const securityAPI = {
  getCaptcha() {
    return instanse.get<GetCaptchaURLType>(`security/get-captcha-url`).then((res) => res.data)
  },
}
