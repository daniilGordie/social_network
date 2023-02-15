import { ProfileType } from './../types/types'
import axios from 'axios'

//TODO: refactor work of baseURL - not working as variable

const instanse = axios.create({
  withCredentials: true,
  headers: { 'API-KEY': 'de9c11c8-ecb8-44ea-8900-dfe5c41b722e' },
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
})

export const usersAPI = {
  async getUsers(currentPage = 1, pageSize = 30) {
    const response = await instanse.get(`users?page=${currentPage}&count=${pageSize}`, {
      withCredentials: true,
    })
    return response.data
  },
  follow(id: number) {
    return instanse.post(`follow/${id}`)
  },
  unfollow(id: number) {
    return instanse.delete(`follow/${id}`)
  },
  getProfile(id: number) {
    // Redirect on correct method
    return profileAPI.getProfile(id)
  },
}

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10,
}

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

export const securityAPI = {
  getCaptcha() {
    return instanse.get(`security/get-captcha-url`, {
      withCredentials: true,
    })
  },
}

export const profileAPI = {
  getProfile(id: number) {
    return instanse.get(`profile/${id}`)
  },
  getStatus(id: number) {
    return instanse.get(`profile/status/${id}`)
  },
  updateStatus(status: string) {
    return instanse.put(`profile/status`, {
      status: status,
    })
  },
  updatePhoto(photoFile: any) {
    const formData = new FormData()
    formData.append('image', photoFile)
    return instanse.put(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  updateProfileData(data: ProfileType) {
    console.log('yo')
    return instanse.put(`profile`, {
      data: data,
    })
  },
}
