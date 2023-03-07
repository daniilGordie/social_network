import React from 'react'
import s from './User.module.css'
import { NavLink } from 'react-router-dom'
import terminator from './../../../assets/4837857.png'
import UserType from './../../../types/types.ts'

type PropsType = {
  user: UserType
  followingInProgress: Array<number>
  unfollowThunk: (id: number) => void
  followThunk: (id: number) => void
}

const User: React.FC<PropsType> = ({ followingInProgress, unfollowThunk, followThunk, user }) => {
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
              onClick={() => {
                unfollowThunk(user.id)
              }}
            >
              UnFollow
            </button>
          ) : (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                followThunk(user.id)
              }}
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
