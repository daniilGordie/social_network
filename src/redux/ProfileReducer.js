const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

const profileReducer = (state, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        message: state.newPostText,
        likeAmount: 0,
      }

      state.posts.push(newPost)
      state.newPostText = ''
      return state
    case UPDATE_NEW_POST_TEXT:
      state.newPostText = action.newText
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
