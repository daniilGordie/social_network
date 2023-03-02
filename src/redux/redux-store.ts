import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import { Action, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { ThunkAction } from 'redux-thunk'
import thunkMiddleware from 'redux-thunk'
import profileReducer from './ProfileReducer.ts'
import dialogReducer from './DialogReducer.ts'
import sidebarReducer from './sidebarReducer.ts'
import usersPageReducer from './usersPageReducer.ts'
import authReducer from './authReducer.ts'
import appReducer from './appReducer.ts'

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

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never

export type InferActionTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<
  PropertiesType<T>
>

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
