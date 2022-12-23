import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import store from './redux/redux-store'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
const rerender = (state) => {
  root.render(
    <>
      <App store={store} />
    </>
  )
}

rerender(store.getState())

store.subscribe(() => {
  let state = store.getState()

  rerender(state)
})
