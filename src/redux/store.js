import profileReducer from './ProfileReducer'
import dialogReducer from './DialogReducer'
import sidebarReducer from './sidebarReducer'

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
    sidebarPage: {},
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
    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.dialogPage = dialogReducer(this._state.dialogPage, action)
    this._state.sidebarPage = sidebarReducer(this._state.sidebarPage, action)

    this._callSubscriber(this._state)
  },
}

export default store
