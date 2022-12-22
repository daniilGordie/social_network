import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'

import profileReducer from './ProfileReducer'
import dialogReducer from './DialogReducer'
import sidebarReducer from './sidebarReducer'

let reducers = combineReducers({
  profilePage: profileReducer,
  dailogPage: dialogReducer,
  sidabar: sidebarReducer,
})

const store = configureStore({
  reducer: reducers,
})

export default store
