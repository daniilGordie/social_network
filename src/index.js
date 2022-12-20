import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import store from './redux/store'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

function rerender(state) {
  root.render(
    <React.StrictMode>
      <App
        store={store}
        appState={store.getState()}
        dispatch={store.dispatch.bind(store)}
      />
    </React.StrictMode>
  )
}

rerender(store.getState())

store.subscribe(rerender)
