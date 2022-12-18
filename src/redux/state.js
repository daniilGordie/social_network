import { rerender } from '../render'

const state = {
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
  },
}

export const addPost = () => {
  let newPost = {
    id: 5,
    message: state.profilePage.newPostText,
    likeAmount: 0,
  }

  state.profilePage.posts.push(newPost)
  state.profilePage.newPostText = ''
  rerender(state)
}

export const updateNewPostText = (newText) => {
  state.profilePage.newPostText = newText
  rerender(state)
}

export default state
