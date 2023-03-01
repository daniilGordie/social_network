import { instanse } from './api.ts'
import { ProfileType } from '../types/types'

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
