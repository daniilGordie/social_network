import { usersAPI, profileAPI } from '../api/api'

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'
const SET_PHOTO = ' SET_PHOTO'
const SET_PROFILE_DATA = 'SET_PROFILE_DATA'

const initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likeAmount: 4 },
    { id: 2, message: "It's my first post", likeAmount: 1 },
    { id: 3, message: "I'm learning react", likeAmount: 0 },
    { id: 4, message: 'Would you want to learn react?', likeAmount: 5 },
  ],
  newPostText: 'vasya is writing',
  profile: null,
  status: '',
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: ++state.posts.id,
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
      return { ...state, profile: action.profile }
    }
    case SET_STATUS: {
      return { ...state, status: action.status }
    }
    case SET_PHOTO: {
      return { ...state, profile: { ...state.profile, photos: action.photos } }
    }
    // case SET_PROFILE_DATA: {
    //   // return {...state, profile}
    // }
    default:
      return state
  }
}

export const addPostActionCreator = () => {
  return {
    type: ADD_POST,
  }
}

export const updateNewPostTextActionCreator = (text) => {
  return {
    newText: text,
    type: UPDATE_NEW_POST_TEXT,
  }
}

const setUserProfile = (profile) => {
  return {
    profile,
    type: SET_USER_PROFILE,
  }
}

const setCurrentStatus = (status) => {
  return {
    status,
    type: SET_STATUS,
  }
}

const savePhotoSuccess = (photos) => {
  return {
    photos,
    type: SET_PHOTO,
  }
}

const setProfileData = (data) => {
  return {
    data,
    type: SET_PROFILE_DATA,
  }
}

export const getUserProfile = (id) => async (dispatch) => {
  const response = await usersAPI.getProfile(id)
  console.log(response)
  dispatch(setUserProfile(response.data))
}

export const getStatus = (id) => async (dispatch) => {
  const response = await profileAPI.getStatus(id)
  dispatch(setCurrentStatus(response.data))
}

export const updateCurrentStatus = (status) => async (dispatch) => {
  const response = await profileAPI.updateStatus(status)
  if (response.data.resultCode === 0) {
    setCurrentStatus(status)
  }
}

export const savePhoto = (file) => async (dispatch) => {
  const response = await profileAPI.updatePhoto(file)
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos))
  }
}

export const saveProfileData = (data) => async (dispatch) => {
  const response = await profileAPI.updateProfileData(data)
  if (response.data.resultCode === 0) {
    console.log(response)
    dispatch(setProfileData(data))
  }
}

export default profileReducer
