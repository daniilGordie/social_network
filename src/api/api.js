import axios from 'axios'

const instanse = axios.create({
  withCredentials: true,
  headers: { 'API-KEY': 'de9c11c8-ecb8-44ea-8900-dfe5c41b722e' },
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
})

export const usersAPI = {
  async getUsers(currentPage = 1, pageSize = 30) {
    const response = await axios.get(
      `${instanse.baseURL}users?page=${currentPage}&count=${pageSize}`,
      {
        withCredentials: true,
      }
    )
    return response.data
  },
}
