import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
// import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension'
// import thunk from 'redux-thunk'
import profileReducer from './ProfileReducer'
import dialogReducer from './DialogReducer'
import sidebarReducer from './sidebarReducer'

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogPage: dialogReducer,
  sidabar: sidebarReducer,
})

const store = configureStore(
  {
    reducer: reducers,
  }
  // composeWithDevTools(applyMiddleware(thunk))
)

export default store
