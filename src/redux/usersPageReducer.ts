import { AppStateType } from './redux-store'
import { UserType } from './../types/types'
import { usersAPI } from '../../src/api/api'
import { updateObjInArray } from '../utils/objects-helpers'
import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

const initialState = {
  usersList: [] as Array<UserType>,
  pageSize: 60,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, // Array of users id
}

export type InitialStateType = typeof initialState

const usersPageReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        usersList: updateObjInArray(state.usersList, action.userID, 'id', { followed: true }),
      }

    case UNFOLLOW:
      return {
        ...state,
        usersList: updateObjInArray(state.usersList, action.userID, 'id', { followed: false }),
      }
    case SET_USERS:
      return {
        ...state,
        usersList: action.usersList,
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      }
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.count,
      }
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      }
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userID]
          : [...state.followingInProgress.filter((id) => id !== action.userID)],
      }
    default:
      return state
  }
}

type ActionTypes =
  | FollowActionType
  | UnfollowActionType
  | SetUserTotalCountActionType
  | SetCurrentPageActionType
  | SetUsersActionType
  | ToggleFollowingInProgressType
  | ToggleIsFetchingActonType

type FollowActionType = {
  type: typeof FOLLOW
  userID: number
}

export const follow = (userID: number): FollowActionType => {
  return {
    type: FOLLOW,
    userID,
  }
}

type UnfollowActionType = {
  type: typeof UNFOLLOW
  userID: number
}

export const unfollow = (userID: number): UnfollowActionType => {
  return {
    type: UNFOLLOW,
    userID,
  }
}

type SetUsersActionType = {
  type: typeof SET_USERS
  usersList: Array<UserType>
}

export const setUsers = (usersList: Array<UserType>): SetUsersActionType => {
  return {
    type: SET_USERS,
    usersList,
  }
}

type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}

export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage,
  }
}

type SetUserTotalCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT
  count: number
}

export const setUserTotalCount = (totalUsersCount: number): SetUserTotalCountActionType => {
  return {
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount,
  }
}

type ToggleIsFetchingActonType = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActonType => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching,
  }
}

type ToggleFollowingInProgressType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
  isFetching: boolean
  userID: number
}

export const toggleFollowingInProgress = (
  isFetching: boolean,
  userID: number
): ToggleFollowingInProgressType => {
  return {
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userID,
  }
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
type DispatchType = Dispatch<ActionTypes>

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
  return async (dispatch: DispatchType) => {
    dispatch(toggleIsFetching(true))

    const data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(setCurrentPage(currentPage))
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setUserTotalCount(data.totalCount))
  }
}

const _followUnfollowFlow = async (
  dispatch: DispatchType,
  id: number,
  apiMethod: any,
  actionCreator: (userID: number) => FollowActionType | UnfollowActionType
) => {
  dispatch(toggleFollowingInProgress(true, id))
  const response = await apiMethod(id)
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(id))
  }
  dispatch(toggleFollowingInProgress(false, id))
}

export const followThunk = (id: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(dispatch, id, usersAPI.follow.bind(usersAPI), follow)
  }
}

export const unfollowThunk = (id: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(dispatch, id, usersAPI.unfollow.bind(usersAPI), unfollow)
  }
}

export default usersPageReducer
