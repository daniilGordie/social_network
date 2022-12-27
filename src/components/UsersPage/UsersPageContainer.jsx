import React from 'react'
import { connect } from 'react-redux'
import UsersPage from './UsersPage'
import { followAC, unfollowAC, setUsersAC } from '../../redux/usersPageReducer'

let mapStateToProps = (state) => {
  return { usersList: state.usersPage.usersList }
}

let mapDispathToProps = (dispatch) => {
  return {
    follow: (userID) => {
      dispatch(followAC(userID))
    },
    unfollow: (userID) => {
      dispatch(unfollowAC(userID))
    },
    setUsers: (usersList) => {
      dispatch(setUsersAC(usersList))
    },
  }
}

const UsersPageContainer = connect(
  mapStateToProps,
  mapDispathToProps
)(UsersPage)

export default UsersPageContainer
