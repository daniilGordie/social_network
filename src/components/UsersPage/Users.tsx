import React from 'react'
import { UserType } from '../../types/types'
import Paginator from '../Paginator/Paginator.tsx'
import User from './User/User.tsx'

type PropsType = {
  usersList: Array<UserType>
  currentPage: number
  followThunk: () => void
  followingInProgress: Array<number>
  onPageChanged: (pageNumber: number) => void
  pageSize: number
  totalItemsCount: number
  unfollowThunk: () => void
}

const Users: React.FC<PropsType> = ({ usersList, ...props }) => {
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
