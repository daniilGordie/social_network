import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
// import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension'
// import thunk from 'redux-thunk'
import profileReducer from './ProfileReducer'
import dialogReducer from './DialogReducer'
import sidebarReducer from './sidebarReducer'
import usersPageReducer from './usersPageReducer'

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogPage: dialogReducer,
  sidebar: sidebarReducer,
  usersPage: usersPageReducer,
})

const store = configureStore(
  {
    reducer: reducers,
  }
  // composeWithDevTools(applyMiddleware(thunk))
)

export default store
