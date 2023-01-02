import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './UsersPage.module.css'
import axios from 'axios'

const Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

  let pages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }
  return (
    <>
      <div>
        {pages.map((p) => {
          return (
            <span
              className={props.currentPage === p && s.selectedPage}
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
                  onClick={() => {
                    axios
                      .post(
                        `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                        {},
                        {
                          withCredentials: true,
                          headers: {
                            'API-KEY': 'de9c11c8-ecb8-44ea-8900-dfe5c41b722e',
                          },
                        }
                      )
                      .then((response) => {
                        if (response.data.resultCode === 0) {
                          props.unfollow(u.id)
                        }
                      })
                  }}
                >
                  UnFollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    axios
                      .post(
                        `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                        {},
                        {
                          withCredentials: true,
                          headers: {
                            'API-KEY': 'de9c11c8-ecb8-44ea-8900-dfe5c41b722e',
                          },
                        }
                      )
                      .then((response) => {
                        if (response.data.resultCode === 0) {
                          props.unfollow(u.id)
                        }
                      })
                    props.follow(u.id)
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
