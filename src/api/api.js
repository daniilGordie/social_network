import axios from 'axios'

//TODO: refactor work of baseURL - not working as variable

const instanse = axios.create({
  withCredentials: true,
  headers: { 'API-KEY': 'de9c11c8-ecb8-44ea-8900-dfe5c41b722e' },
  url: 'https://social-network.samuraijs.com/api/1.0/',
})

export const usersAPI = {
  async getUsers(currentPage = 1, pageSize = 30) {
    const response = await instanse.get(
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
    // Redirect on correct method
    return profileAPI.getProfile(id)
  },
}

export const authAPI = {
  me() {
    return instanse.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
      withCredentials: true,
    })
  },
  login(email, password, rememberMe = false) {
    return instanse.post(`https://social-network.samuraijs.com/api/1.0/auth/login`, {
      email,
      password,
      rememberMe,
    })
  },
  logout() {
    return instanse.delete(`https://social-network.samuraijs.com/api/1.0/auth/login`)
  },
}

export const profileAPI = {
  getProfile(id) {
    return instanse.get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`)
  },
  getStatus(id) {
    return instanse.get(`https://social-network.samuraijs.com/api/1.0/profile/status/${id}`)
  },
  updateStatus(status) {
    return instanse.put(`https://social-network.samuraijs.com/api/1.0/profile/status`, {
      status: status,
    })
  },
  updatePhoto(photoFile) {
    const formData = new FormData()
    formData.append('image', photoFile)
    return instanse.put(`https://social-network.samuraijs.com/api/1.0/profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
