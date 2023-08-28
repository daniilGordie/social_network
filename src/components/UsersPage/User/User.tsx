import React from 'react'
import s from './User.module.css'
import { NavLink } from 'react-router-dom'
import terminator from './../../../assets/4837857.png'
import UserType from './../../../types/types.ts'
import { follow, unfollow } from './../../../redux/users-reducer.ts'


type PropsType = {
  user: UserType
  followingInProgress: Array<number>
}

const User: React.FC<PropsType> = ({ followingInProgress, user }) => {
  const followG = follow(user.id)
  const unfollowG = unfollow(user.id)
  return (
    <div>
      <span>
        <div>
          <NavLink to={'/profile/' + user.id}>
            <img src={user.photos.small || terminator} alt="u-avatar" className={s.userPhoto} />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={
                unfollowG
              }
            >
              UnFollow
            </button>
          ) : (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={
                followG
              }
            >
              Follow
            </button>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
        <span>
          <div>"u.location.city"</div>
          <div>"u.location.country"</div>
        </span>
      </span>
    </div>
  )
}

export default User
