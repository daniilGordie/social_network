import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import { Action, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { ThunkAction } from 'redux-thunk'
import thunkMiddleware from 'redux-thunk'
import profileReducer from './profile-reducer.ts'
import dialogReducer from './dialog-reducer.ts'
import sidebarReducer from './sidebarReducer.ts'
import usersPageReducer from './users-reducer.ts'
import authReducer from './auth-reducer.ts'
import appReducer from './app-reducer.ts'

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogPage: dialogReducer,
  sidebar: sidebarReducer,
  usersPage: usersPageReducer,
  auth: authReducer,
  app: appReducer,
})

type RootReducerType = typeof reducers
export type AppStateType = ReturnType<RootReducerType>

export type InferActionTypes<T> = T extends { [key: string]: (...args: any[]) => infer U }
  ? U
  : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  AppStateType,
  unknown,
  A
>

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = configureStore(
  {
    reducer: reducers,
  },
  // @ts-ignore
  composedEnhancer
)

export default store
