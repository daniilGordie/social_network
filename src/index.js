import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import store from './redux/store'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

const rerender = () => {
  root.render(
    <>
      <App
        state={store.getState()}
        dispatch={store.dispatch.bind(store)}
        store={store}
      />
    </>
  )
}

rerender(store.getState())

store.subscribe(() => {
  let state = store.getState()
  rerender(state)
})
