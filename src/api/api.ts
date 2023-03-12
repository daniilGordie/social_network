import axios from 'axios'
import { UserType } from '../types/types'

export const instanse = axios.create({
  withCredentials: true,
  headers: { 'API-KEY': '44c3f780-250d-4520-878b-69586e5ed357' },
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
})

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10,
}

export type GetItemsType = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}

export type ResponseType<D = {}, RC = ResultCodeEnum> = {
  data: D
  messages: Array<string>
  resultCode: RC
}
