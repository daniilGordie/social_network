import { instanse } from './api.ts'
import { profileAPI } from './profile-api.ts'

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
