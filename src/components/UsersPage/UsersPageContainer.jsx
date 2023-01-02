import React from 'react'
import { connect } from 'react-redux'
import Users from './Users'
import {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setUserTotalCount,
  toggleIsFetching,
} from '../../redux/usersPageReducer'
import Preloader from '../common/Preloader/Preloader'
import { usersAPI } from '../../api/api'

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.toggleIsFetching(true)

    usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then((data) => {
      this.props.toggleIsFetching(false)
      this.props.setUsers(data.items)
      this.props.setUserTotalCount(data.totalCount)
    })
  }

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber)
    this.props.toggleIsFetching(true)
    usersAPI.getUsers(pageNumber, this.props.pageSize).then((data) => {
      this.props.toggleIsFetching(false)
      this.props.setUsers(data.items)
    })
  }

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          usersList={this.props.usersList}
          unfollow={this.props.unfollow}
          follow={this.props.follow}
        />
      </>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    usersList: state.usersPage.usersList,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
  }
}

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setUserTotalCount,
  toggleIsFetching,
})(UsersContainer)
