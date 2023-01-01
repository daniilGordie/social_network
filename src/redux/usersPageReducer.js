const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'

let initialState = {
  usersList: [],
  pageSize: 60,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
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
        currentPage: { ...state, currentPage: action.currentPage },
      }
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.count,
      }
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        usersList: { ...state, isFetching: action.isFetching },
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

export default usersPageReducer

// <---- USERS DATA EXAMPLE ----->
// {
//   id: 1,
//   photoUrl: '',
//   followed: true,
//   fullName: 'Dmitry',
//   status: 'I am a boss',
//   location: { city: 'Odessa', country: 'Ukraine' },
// },
// {
//   id: 2,
//   photoUrl: '',
//   followed: true,
//   fullName: 'Valera',
//   status: 'I am a boss',
//   location: { city: 'Lviv', country: 'Ukraine' },
// },
// {
//   id: 3,
//   photoUrl: '',
//   followed: false,
//   fullName: 'Jora',
//   status: 'I am a boss',
//   location: { city: 'Kharkiv', country: 'Ukraine' },
// },
// {
//   id: 4,
//   photoUrl: '',
//   followed: true,
//   fullName: 'Olexandr',
//   status: 'I am a boss',
//   location: { city: 'Donetsk', country: 'Ukraine' },
// },
