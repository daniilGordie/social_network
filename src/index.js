import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import App from './App'

const dialogData = [
  {
    id: 1,
    name: 'Dimych',
  },
  {
    id: 2,
    name: 'Dimasic',
  },
  {
    id: 3,
    name: 'Dima',
  },
]

const messagesData = [
  {
    id: '1',
    message: 'Hi',
  },
  {
    id: '2',
    message: 'How are you',
  },
  {
    id: '3',
    message: 'Ready-Go',
  },
]

let posts = [
  { id: 1, message: 'Hi, how are you?', likeAmount: 4 },
  { id: 2, message: "It's my first post", likeAmount: 1 },
  { id: 3, message: "I'm learning react", likeAmount: 0 },
  { id: 4, message: 'Would you want to learn react?', likeAmount: 5 },
]

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App posts={posts} messagesData={messagesData} dialogData={dialogData} />
  </React.StrictMode>
)
