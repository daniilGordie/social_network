import { instanse, ResponseType } from './api.ts'
import { PhotosType, ProfileType } from '../types/types'

export const profileAPI = {
  getProfile(id: number) {
    return instanse.get<ProfileType>(`profile/${id}`)
  },
  getStatus(id: number) {
    return instanse.get<number>(`profile/status/${id}`)
  },
  updateStatus(status: string) {
    return instanse.put<ResponseType>(`profile/status`, {
      status: status,
    })
  },
  updatePhoto(photoFile: any) {
    const formData = new FormData()
    formData.append('image', photoFile)
    return instanse.put<ResponseType<PhotosType>>(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  updateProfileData(data: ProfileType) {
    return instanse.put(`profile`, {
      data: data,
    })
  },
}
