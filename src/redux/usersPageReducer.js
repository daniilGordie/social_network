import { usersAPI } from '../../src/api/api'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'

const initialState = {
  usersList: [],
  pageSize: 60,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
}

const usersPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        usersList: state.usersList.map((u) => {
          if (u.id === action.userID) {
            return { ...u, followed: true }
          }
          return u
        }),
      }

    case UNFOLLOW:
      return {
        ...state,
        usersList: state.usersList.map((u) => {
          if (u.id === action.userID) {
            return { ...u, followed: false }
          }
          return u
        }),
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

export const follow = (userID) => {
  return {
    type: FOLLOW,
    userID,
  }
}
export const unfollow = (userID) => {
  return {
    type: UNFOLLOW,
    userID,
  }
}

export const setUsers = (usersList) => {
  return {
    type: SET_USERS,
    usersList,
  }
}

export const setCurrentPage = (currentPage) => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage,
  }
}

export const setUserTotalCount = (totalUsersCount) => {
  return {
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount,
  }
}

export const toggleIsFetching = (isFetching) => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching,
  }
}

export const toggleFollowingInProgress = (isFetching, userID) => {
  return {
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userID,
  }
}

export const getUsers = (currentPage, pageSize) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true))

    usersAPI.getUsers(currentPage, pageSize).then((data) => {
      dispatch(setCurrentPage(currentPage))

      dispatch(toggleIsFetching(false))
      dispatch(setUsers(data.items))
      dispatch(setUserTotalCount(data.totalCount))
    })
  }
}

export const followThunk = (id) => {
  return (dispatch) => {
    dispatch(toggleFollowingInProgress(true, id))
    usersAPI.follow(id).then((response) => {
      if (response.data.resultCode === 0) {
        follow(id)
      }
      dispatch(toggleFollowingInProgress(false, id))
    })
  }
}

export const unfollowThunk = (id) => {
  return (dispatch) => {
    dispatch(toggleFollowingInProgress(true, id))
    usersAPI.unfollow(id).then((response) => {
      if (response.data.resultCode === 0) {
        unfollow(id)
      }
      dispatch(toggleFollowingInProgress(false, id))
    })
  }
}

export default usersPageReducer
