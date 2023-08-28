import { ResponseType } from './../api/api'
import { InferActionTypes, BaseThunkType } from './redux-store'
import { UserType } from '../types/types'
import { usersAPI } from '../../src/api/users-api.ts'
import { updateObjInArray } from '../utils/objects-helpers.ts'
import { Dispatch } from 'redux'

const FOLLOW = 'sn/users/FOLLOW'
const UNFOLLOW = 'sn/users/UNFOLLOW'
const SET_USERS = 'sn/users/SET_USERS'
const SET_CURRENT_PAGE = 'sn/users/SET_CURRENT_PAGE'
const SET_FILTER = 'SN/USERS/SET_FILTER'
const SET_TOTAL_USERS_COUNT = 'sn/users/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'sn/users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'sn/users/TOGGLE_IS_FOLLOWING_PROGRESS'

const initialState = {
  users: [] as Array<UserType>,
  pageSize: 60,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
  filter: {
    term: '',
    friend: null as null | boolean,
  },
}

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter

const usersPageReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjInArray(state.users, action.userID, 'id', { followed: true }),
      }

    case UNFOLLOW:
      return {
        ...state,
        users: updateObjInArray(state.users, action.userID, 'id', { followed: false }),
      }
    case SET_USERS:
      return {
        ...state,
        users: action.users,
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
    case SET_FILTER: {
      return { ...state, filter: action.payload }
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
  followC: (userID: number) =>
  ({
    type: FOLLOW,
    userID,
  } as const),

  unfollowC: (userID: number) =>
  ({
    type: UNFOLLOW,
    userID,
  } as const),

  setFilter: (filter: FilterType) =>
  ({
    type: 'SN/USERS/SET_FILTER',
    payload: filter,
  } as const),

  setUsers: (users: Array<UserType>) =>
  ({
    type: SET_USERS,
    users,
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

type ThunkType = BaseThunkType<ActionTypes>

type DispatchType = Dispatch<ActionTypes>

export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(page))
    dispatch(actions.setFilter(filter))

    let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setUserTotalCount(data.totalCount))
  }
}

export const follow = (id) => {
    actions.toggleFollowingInProgress(true, id)
    usersAPI.follow(id).then((response) => {
      if (response.data.resultCode === 0) {
        actions.followC(id)
      }
      actions.toggleFollowingInProgress(false, id)
    })
  
}

export const unfollow = (id) => {
   actions.toggleFollowingInProgress(true, id)
    usersAPI.unfollow(id).then((response) => {
      if (response.data.resultCode === 0) {
        actions.unfollowC(id)
      }
      actions.toggleFollowingInProgress(false, id)
    })
}

// const _followUnfollowFlow = async (
//   dispatch: DispatchType,
//   id: number,
//   apiMethod: (userId: number) => Promise<ResponseType>,
//   actionCreator: (userID: number) => ActionTypes
// ) => {
//   actions.toggleFollowingInProgress(true, id)
//   const response = await apiMethod(id)
//   if (response.resultCode === 0) {
//     dispatch(actionCreator(id))
//   }
//   actions.toggleFollowingInProgress(false, id)
// }

// export const follow = (id: number): ThunkType => {
//   return async (dispatch) => {
//     _followUnfollowFlow(dispatch, id, usersAPI.follow.bind(usersAPI), actions.followC)
//   }
// }

// export const unfollow = (id: number): ThunkType => {
//   return async (dispatch) => {
//     _followUnfollowFlow(dispatch, id, usersAPI.unfollow.bind(usersAPI), actions.unfollowC)
//   }
// }

export default usersPageReducer
