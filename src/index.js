import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import store from './redux/store'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

let rerender = (state) => {
  root.render(
    <React.StrictMode>
      <App
        appState={store.getState()}
        addPost={store.addPost.bind(store)}
        updateNewPostText={store.updateNewPostText.bind(store)}
      />
    </React.StrictMode>
  )
}

rerender(store.getState())

store.subscribe(rerender)
