import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import profileReducer from './ProfileReducer'
import dialogReducer from './DialogReducer'
import sidebarReducer from './sidebarReducer'
import usersPageReducer from './usersPageReducer'
import authReducer from './authReducer'

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogPage: dialogReducer,
  sidebar: sidebarReducer,
  usersPage: usersPageReducer,
  auth: authReducer,
})

const store = configureStore(
  {
    reducer: reducers,
  },
  applyMiddleware(thunkMiddleware)
)

export default store
