import axios from 'axios'

//TODO: refactor work of baseURL - not working as variable

const instanse = axios.create({
  withCredentials: true,
  headers: { 'API-KEY': 'de9c11c8-ecb8-44ea-8900-dfe5c41b722e' },
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
})

export const usersAPI = {
  async getUsers(currentPage = 1, pageSize = 30) {
    const response = await axios.get(
      `https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`,
      {
        withCredentials: true,
      }
    )
    return response.data
  },
  follow(id) {
    return instanse.post(`https://social-network.samuraijs.com/api/1.0/follow/${id}`)
  },
  unfollow(id) {
    return instanse.delete(`https://social-network.samuraijs.com/api/1.0/follow/${id}`)
  },
  getProfile(id) {
    return axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`)
  },
}

export const authAPI = {
  me() {
    return instanse.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
      withCredentials: true,
    })
  },
}
