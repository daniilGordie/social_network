import { combineReducers, configureStore } from 'redux'

import profileReducer from './ProfileReducer'
import dialogReducer from './DialogReducer'
import sidebarReducer from './sidebarReducer'

let reducers = combineReducers({
  profileReducer,
  dialogReducer,
  sidebarReducer,
})

const store = configureStore(reducers)

export default store
