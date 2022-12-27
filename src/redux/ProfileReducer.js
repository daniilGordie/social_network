// import { createReducer } from '@reduxjs/toolkit'
const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

const initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likeAmount: 4 },
    { id: 2, message: "It's my first post", likeAmount: 1 },
    { id: 3, message: "I'm learning react", likeAmount: 0 },
    { id: 4, message: 'Would you want to learn react?', likeAmount: 5 },
  ],
  newPostText: 'vasya is writing',
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
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

export default profileReducer

// TODO: Refactor reducers by createReducers
