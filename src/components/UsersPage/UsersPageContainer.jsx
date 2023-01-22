import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Users from './Users'
import {
  toggleFollowingInProgress,
  getUsers,
  followThunk,
  unfollowThunk,
} from '../../redux/usersPageReducer'
import {
  getUsersList,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress,
} from '../../redux/users-selector'
import Preloader from '../common/Preloader/Preloader'

const UsersContainer = (props) => {
  useEffect(() => {
    props.getUsers(props.currentPage, props.pageSize)
  }, [props.currentPage, props.pageSize])

  const onPageChanged = (pageNumber) => {
    props.getUsers(pageNumber, props.pageSize)
  }
  return (
    <>
      {props.isFetching ? <Preloader /> : null}
      <Users
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onPageChanged={onPageChanged}
        usersList={props.usersList}
        unfollowThunk={props.unfollowThunk}
        followThunk={props.followThunk}
        followingInProgress={props.followingInProgress}
      />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    usersList: getUsersList(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  }
}

export default connect(mapStateToProps, {
  toggleFollowingInProgress,
  getUsers,
  followThunk,
  unfollowThunk,
})(UsersContainer)
