import React from 'react'
import Paginator from '../Paginator/Paginator'
import User from './User/User'

const Users = ({ usersList, ...props }) => {
  return (
    <>
      <Paginator {...props} />
      {Array.from(usersList).map((u) => (
        <User
          key={u.id}
          user={u}
          followingInProgress={props.followingInProgress}
          unfollowThunk={props.unfollowThunk}
          followThunk={props.followThunk}
        />
      ))}
    </>
  )
}

export default Users
