import { usersAPI } from '../api/users-api.ts'
import { profileAPI } from '../api/profile-api.ts'
import { PostType, PhotosType, ProfileType } from './../types/types'

const ADD_POST = 'ADD_POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const SET_PHOTO = ' SET_PHOTO'
const SET_PROFILE_DATA = 'SET_PROFILE_DATA'

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

const profileReducer = (state = initialState, action: any): InitialStateType => {
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

type AddPostActionCreatorType = {
  type: typeof ADD_POST
}

export const addPostActionCreator = (): AddPostActionCreatorType => {
  return {
    type: ADD_POST,
  }
}

type UpdateNewPostTextActionCreatorType = {
  type: typeof UPDATE_NEW_POST_TEXT
  newText: string
}

export const updateNewPostTextActionCreator = (
  text: string
): UpdateNewPostTextActionCreatorType => {
  return {
    newText: text,
    type: UPDATE_NEW_POST_TEXT,
  }
}

type SetUserProfileType = {
  type: typeof SET_USER_PROFILE
  profile: ProfileType
}

const setUserProfile = (profile: ProfileType): SetUserProfileType => {
  return {
    profile,
    type: SET_USER_PROFILE,
  }
}

type SetCurrentStatusType = {
  type: typeof SET_STATUS
  status: string
}

const setCurrentStatus = (status: string): SetCurrentStatusType => {
  return {
    status,
    type: SET_STATUS,
  }
}

type SavePhotoSuccessType = {
  photos: PhotosType
  type: typeof SET_PHOTO
}

const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => {
  return {
    photos,
    type: SET_PHOTO,
  }
}

type SetProfileDataType = {
  data: ProfileType
  type: typeof SET_PROFILE_DATA
}

const setProfileData = (data: ProfileType): SetProfileDataType => {
  return {
    data,
    type: SET_PROFILE_DATA,
  }
}

export const getUserProfile = (id: number) => async (dispatch: any) => {
  const response = await usersAPI.getProfile(id)
  console.log(response)
  dispatch(setUserProfile(response.data))
}

export const getStatus = (id: number) => async (dispatch: any) => {
  const response = await profileAPI.getStatus(id)
  dispatch(setCurrentStatus(response.data))
}

export const updateCurrentStatus = (status: string) => async (dispatch: any) => {
  const response = await profileAPI.updateStatus(status)
  if (response.data.resultCode === 0) {
    setCurrentStatus(status)
  }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
  const response = await profileAPI.updatePhoto(file)
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos))
  }
}

export const saveProfileData = (data: ProfileType) => async (dispatch: any) => {
  const response = await profileAPI.updateProfileData(data)
  if (response.data.resultCode === 0) {
    console.log(response)
    dispatch(setProfileData(data))
  }
}

export default profileReducer
