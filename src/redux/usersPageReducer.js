const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'

let initialState = {
  usersList: [
    {
      id: 1,
      photoUrl: '',
      followed: true,
      fullName: 'Dmitry',
      status: 'I am a boss',
      location: { city: 'Odessa', country: 'Ukraine' },
    },
    {
      id: 2,
      photoUrl: '',
      followed: true,
      fullName: 'Valera',
      status: 'I am a boss',
      location: { city: 'Lviv', country: 'Ukraine' },
    },
    {
      id: 3,
      photoUrl: '',
      followed: false,
      fullName: 'Jora',
      status: 'I am a boss',
      location: { city: 'Kharkiv', country: 'Ukraine' },
    },
    {
      id: 4,
      photoUrl: '',
      followed: true,
      fullName: 'Olexandr',
      status: 'I am a boss',
      location: { city: 'Donetsk', country: 'Ukraine' },
    },
  ],
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
        usersList: { ...state.usersList, ...action.usersList },
      }
    default:
      return state
  }
}

export const followAC = (userID) => {
  return {
    type: FOLLOW,
    userID,
  }
}
export const unfollowAC = (userID) => {
  return {
    type: UNFOLLOW,
    userID,
  }
}

export const setUsersAC = (usersList) => {
  return {
    type: SET_USERS,
    usersList,
  }
}

export default usersPageReducer
