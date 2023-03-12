import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Users from './Users.tsx'
import { AppStateType } from './../../redux/redux-store.ts'
import { getUsers, followThunk, unfollowThunk } from '../../redux/users-reducer.ts'
import {
  getUsersList,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress,
} from '../../redux/users-selector.ts'
import Preloader from '../common/Preloader/Preloader.tsx'
import { UserType } from '../../types/types'

type MapStatePropsType = {
  currentPage: number
  pageSize: number
  isFetching: boolean
  totalUsersCount: number
  usersList: Array<UserType>
  followingInProgress: Array<number>
}

type MapDispatchPropsType = {
  unfollowThunk: () => void
  getUsers: (currentPage: number, pageSize: number) => void
  followThunk: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const UsersContainer: React.FC<PropsType> = (props) => {
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
        totalItemsCount={props.totalUsersCount}
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    usersList: getUsersList(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  }
}

export default connect<MapStatePropsType, MapDispatchPropsType>(mapStateToProps, {
  getUsers,
  followThunk,
  unfollowThunk,
})(UsersContainer)
