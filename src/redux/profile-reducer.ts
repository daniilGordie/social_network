import { usersAPI } from '../api/users-api.ts'
import { profileAPI } from '../api/profile-api.ts'
import { PostType, PhotosType, ProfileType } from '../types/types'
import { InferActionTypes, BaseThunkType } from './redux-store'

const ADD_POST = 'sn/profile/ADD_POST'
const DELETE_POST = 'sn/profile/DELETE_POST'
const SET_USER_PROFILE = 'sn/profile/SET_USER_PROFILE'
const SET_STATUS = 'sn/profile/SET_STATUS'
const SET_PHOTO = 'sn/profile/SET_PHOTO'

const initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likeAmount: 4 },
    { id: 2, message: "It's my first post", likeAmount: 1 },
    { id: 3, message: "I'm learning react", likeAmount: 0 },
    { id: 4, message: 'Would you want to learn react?', likeAmount: 5 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '',
}

export type InitialStateType = typeof initialState
type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 10432,
        message: action.newPostText,
        likeAmount: 0,
      }
      return { ...state, posts: [...state.posts, newPost] }
    }
    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile }
    }
    case SET_STATUS: {
      return { ...state, status: action.status }
    }
    case SET_PHOTO: {
      return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }
    }
    case DELETE_POST: {
      return { ...state, posts: state.posts.filter((p) => p.id != action.postId) }
    }
    default:
      return state
  }
}

export const actions = {
  addPostActionCreator: (newPostText: string) =>
    ({
      type: ADD_POST,
      newPostText,
    } as const),
  setUserProfile: (profile: ProfileType) =>
    ({
      profile,
      type: SET_USER_PROFILE,
    } as const),
  setCurrentStatus: (status: string) =>
    ({
      status,
      type: SET_STATUS,
    } as const),
  savePhotoSuccess: (photos: PhotosType) =>
    ({
      photos,
      type: SET_PHOTO,
    } as const),
  deletePost: (postId: number) =>
    ({
      type: DELETE_POST,
      postId,
    } as const),
}

export const getUserProfile =
  (userID: number): ThunkType =>
  async (dispatch) => {
    const response = await usersAPI.getProfile(userID)
    dispatch(actions.setUserProfile(response))
  }

export const getStatus =
  (userID: number): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.getStatus(userID)
    dispatch(actions.setCurrentStatus(response))
  }

export const updateCurrentStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.resultCode === 0) {
      actions.setCurrentStatus(status)
    }
  }

export const savePhoto =
  (file: File): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.updatePhoto(file)
    if (response.resultCode === 0) {
      dispatch(actions.savePhotoSuccess(response.data.photos))
    }
  }

export const saveProfileData =
  (profile: ProfileType): ThunkType =>
  async (dispatch, getState) => {
    const userID = getState().auth.userID
    const response = await profileAPI.updateProfileData(profile)
    if (response.resultCode === 0) {
      if (userID != null) {
        dispatch(getUserProfile(userID))
      } else {
        throw new Error("userId can't be null")
      }
    } else {
      return Promise.reject(response.messages[0])
    }
  }

export default profileReducer
