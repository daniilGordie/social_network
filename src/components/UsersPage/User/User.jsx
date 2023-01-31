import React from 'react'
import s from './User.module.css'
import { NavLink } from 'react-router-dom'

const User = ({ followingInProgress, unfollowThunk, followThunk, user }) => {
  return (
    <div>
      <span>
        <div>
          <NavLink to={'/profile/' + user.id}>
            <img src={user.photos} alt="u-avatar" className={s.userPhoto} />
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
