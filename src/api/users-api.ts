import { instanse } from './api.ts'
import { profileAPI } from './profile-api.ts'
import { GetItemsType, ResponseType } from './api.ts'
import { AxiosPromise } from 'axios'

export const usersAPI = {
  async getUsers(currentPage = 1, pageSize = 30) {
    const response = await instanse.get<GetItemsType>(
      `users?page=${currentPage}&count=${pageSize}`,
      {
        withCredentials: true,
      }
    )
    return response.data
  },
  follow(id: number) {
    return instanse.post<ResponseType>(`follow/${id}`)
  },
  unfollow(id: number) {
    return instanse.delete(`follow/${id}`) as AxiosPromise<ResponseType>
  },
  getProfile(id: number) {
    // Redirect on correct method
    return profileAPI.getProfile(id)
  },
}
