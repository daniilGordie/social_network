import axios from 'axios'

export const instanse = axios.create({
  withCredentials: true,
  headers: { 'API-KEY': 'de9c11c8-ecb8-44ea-8900-dfe5c41b722e' },
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
})

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10,
}
