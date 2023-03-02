import { usersAPI } from '../api/users-api.ts'
import { profileAPI } from '../api/profile-api.ts'
import { PostType, PhotosType, ProfileType } from './../types/types'
import { InferActionTypes, BaseThunkType } from './redux-store'

const ADD_POST = 'sn/profile/ADD_POST'
const UPDATE_NEW_POST_TEXT = 'sn/profile/UPDATE_NEW_POST_TEXT'
const SET_USER_PROFILE = 'sn/profile/SET_USER_PROFILE'
const SET_STATUS = 'sn/profile/SET_STATUS'
const SET_PHOTO = 'sn/profile/SET_PHOTO'
const SET_PROFILE_DATA = 'sn/profile/SET_PROFILE_DATA'

const initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likeAmount: 4 },
    { id: 2, message: "It's my first post", likeAmount: 1 },
    { id: 3, message: "I'm learning react", likeAmount: 0 },
    { id: 4, message: 'Would you want to learn react?', likeAmount: 5 },
  ] as Array<PostType>,
  newPostText: 'vasya is writing',
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
        message: state.newPostText,
        likeAmount: 0,
      }
      let profileState = { ...state }

      profileState.posts = [...state.posts]
      profileState.posts.push(newPost)
      profileState.newPostText = ''
      return profileState
    }
    case UPDATE_NEW_POST_TEXT: {
      let profileState = { ...state }
      profileState.newPostText = action.newText
      return profileState
    }
    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile as ProfileType }
    }
    case SET_STATUS: {
      return { ...state, status: action.status }
    }
    case SET_PHOTO: {
      return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }
    }
    // case SET_PROFILE_DATA: {
    //   return { ...state, profile }
    // }
    default:
      return state
  }
}

export const actions = {
  addPostActionCreator: () =>
    ({
      type: ADD_POST,
    } as const),
  updateNewPostTextActionCreator: (text: string) =>
    ({
      newText: text,
      type: UPDATE_NEW_POST_TEXT,
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
  setProfileData: (data: ProfileType) =>
    ({
      data,
      type: SET_PROFILE_DATA,
    } as const),
}

export const getUserProfile =
  (id: number): ThunkType =>
  async (dispatch) => {
    const response = await usersAPI.getProfile(id)
    console.log(response)
    dispatch(actions.setUserProfile(response.data))
  }

export const getStatus =
  (id: number): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.getStatus(id)
    dispatch(actions.setCurrentStatus(response.data))
  }

export const updateCurrentStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
      actions.setCurrentStatus(status)
    }
  }

export const savePhoto =
  (file: File): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.updatePhoto(file)
    if (response.data.resultCode === 0) {
      dispatch(actions.savePhotoSuccess(response.data.data.photos))
    }
  }

export const saveProfileData =
  (data: ProfileType): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.updateProfileData(data)
    if (response.data.resultCode === 0) {
      console.log(response)
      dispatch(actions.setProfileData(data))
    }
  }

export default profileReducer
