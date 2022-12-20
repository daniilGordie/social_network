const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'
const store = {
  // Private data
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: 'Hi, how are you?', likeAmount: 4 },
        { id: 2, message: "It's my first post", likeAmount: 1 },
        { id: 3, message: "I'm learning react", likeAmount: 0 },
        { id: 4, message: 'Would you want to learn react?', likeAmount: 5 },
      ],
      newPostText: 'vasya is writing',
    },
    dialogPage: {
      dialogData: [
        { id: 1, name: 'Dimych' },
        { id: 2, name: 'Dimasic' },
        { id: 3, name: 'Dima' },
      ],
      messagesData: [
        { id: '1', message: 'Hi' },
        { id: '2', message: 'How are you' },
        { id: '3', message: 'Ready-Go' },
      ],
      newMessageBody: '',
    },
  },
  _callSubscriber() {},

  // Public interface
  getState() {
    return this._state
  },
  subscribe(observer) {
    this._callSubscriber = observer
  },
  // UI Handlers
  dispatch(action) {
    if (action.type === ADD_POST) {
      let newPost = {
        id: 5,
        message: this._state.profilePage.newPostText,
        likeAmount: 0,
      }

      this._state.profilePage.posts.push(newPost)
      this._state.profilePage.newPostText = ''
      this._callSubscriber(this._state)
    } else if (action.type === UPDATE_NEW_POST_TEXT) {
      this._state.profilePage.newPostText = action.newText
      this._callSubscriber(this._state)
    } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
      this._state.dialogPage.newMessageBody = action.body
      this._callSubscriber(this._state)
    } else if (action.type === SEND_MESSAGE) {
      let body = this._state.dialogPage.newMessageBody
      this._state.dialogPage.newMessageBody = ''
      this._state.dialogPage.messagesData.push({ id: 6, message: body })
      this._callSubscriber(this._state)
    }
  },
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

export const sendMessageCreator = () => {
  return {
    type: SEND_MESSAGE,
  }
}
export const updateNewMessageBodyCreator = (text) => {
  return {
    body: text,
    type: UPDATE_NEW_MESSAGE_BODY,
  }
}

export default store
