import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './UsersPage.module.css'

const Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

  let pages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }
  return (
    <>
      <div>
        {pages.map((p, id) => {
          return (
            <span
              key={id}
              className={props.currentPage === p ? s.selectedPage : ''}
              onClick={(e) => {
                props.onPageChanged(p)
              }}
            >
              {p}
            </span>
          )
        })}
      </div>
      {Array.from(props.usersList).map((u) => (
        <div key={u.id}>
          <span>
            <div>
              <NavLink to={'/profile/' + u.id}>
                <img src={u.photos} alt="u-avatar" className={s.userPhoto} />
              </NavLink>
            </div>
            <div>
              {u.followed ? (
                <button
                  disabled={props.followingInProgress.some((id) => id === u.id)}
                  onClick={() => {
                    props.unfollowThunk(u.id)
                  }}
                >
                  UnFollow
                </button>
              ) : (
                <button
                  disabled={props.followingInProgress.some((id) => id === u.id)}
                  onClick={() => {
                    props.followThunk(u.id)
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{u.name}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>"u.location.city"</div>
              <div>"u.location.country"</div>
            </span>
          </span>
        </div>
      ))}
    </>
  )
}

export default Users
