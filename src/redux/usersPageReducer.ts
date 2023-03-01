import { AppStateType, InferActionTypes } from './redux-store'
import { UserType } from './../types/types'
import { usersAPI } from '../../src/api/users-api.ts'
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

type ActionTypes = InferActionTypes<typeof actions>

export const actions = {
  follow: (userID: number) =>
    ({
      type: FOLLOW,
      userID,
    } as const),

  unfollow: (userID: number) =>
    ({
      type: UNFOLLOW,
      userID,
    } as const),

  setUsers: (usersList: Array<UserType>) =>
    ({
      type: SET_USERS,
      usersList,
    } as const),

  setCurrentPage: (currentPage: number) =>
    ({
      type: SET_CURRENT_PAGE,
      currentPage,
    } as const),

  setUserTotalCount: (totalUsersCount: number) =>
    ({
      type: SET_TOTAL_USERS_COUNT,
      count: totalUsersCount,
    } as const),

  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: TOGGLE_IS_FETCHING,
      isFetching,
    } as const),

  toggleFollowingInProgress: (isFetching: boolean, userID: number) =>
    ({
      type: TOGGLE_IS_FOLLOWING_PROGRESS,
      isFetching,
      userID,
    } as const),
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
type DispatchType = Dispatch<ActionTypes>

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
  return async (dispatch: DispatchType) => {
    dispatch(actions.toggleIsFetching(true))

    const data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(actions.setCurrentPage(currentPage))
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setUserTotalCount(data.totalCount))
  }
}

const _followUnfollowFlow = async (
  dispatch: DispatchType,
  id: number,
  apiMethod: any,
  actionCreator: (userID: number) => ActionTypes
) => {
  dispatch(actions.toggleFollowingInProgress(true, id))
  const response = await apiMethod(id)
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(id))
  }
  dispatch(actions.toggleFollowingInProgress(false, id))
}

export const followThunk = (id: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(dispatch, id, usersAPI.follow.bind(usersAPI), actions.follow)
  }
}

export const unfollowThunk = (id: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(dispatch, id, usersAPI.unfollow.bind(usersAPI), actions.unfollow)
  }
}

export default usersPageReducer
