import { instanse, ResponseType } from './api.ts'
import { PhotosType, ProfileType } from '../types/types'

export const profileAPI = {
  getProfile(userID: number) {
    return instanse.get<ProfileType>(`profile/${userID}`).then((res) => res.data)
  },
  getStatus(userID: number) {
    return instanse.get<number>(`profile/status/${userID}`).then((res) => res.data)
  },
  updateStatus(status: string) {
    return instanse
      .put<ResponseType>(`profile/status`, {
        status: status,
      })
      .then((res) => res.data)
  },
  updatePhoto(photoFile: File) {
    const formData = new FormData()
    formData.append('image', photoFile)
    return instanse
      .put<ResponseType<PhotosType>>(`profile/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res.data)
  },
  updateProfileData(profile: ProfileType) {
    return instanse.put<ResponseType>(`profile`, profile).then((res) => res.data)
  },
}
