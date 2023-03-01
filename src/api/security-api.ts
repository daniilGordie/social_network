import { instanse } from './api.ts'

export const securityAPI = {
  getCaptcha() {
    return instanse.get(`security/get-captcha-url`, {
      withCredentials: true,
    })
  },
}
