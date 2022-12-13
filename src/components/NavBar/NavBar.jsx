import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './NavBar.module.css'

const NavBar = () => {
  return (
    <nav className={s.navigation}>
      <div>
        <NavLink to={'/profile'} className={s.item}>
          Profile
        </NavLink>
      </div>
      <div>
        <NavLink to={'/dialogs'} className={s.item}>
          Messages
        </NavLink>
      </div>
      <div>
        <NavLink to={'/news'} className={s.item}>
          News
        </NavLink>
      </div>
      <div>
        <NavLink to={'/music'} className={s.item}>
          Music
        </NavLink>
      </div>
      <div>
        <NavLink to={'/admin'} className={s.item}>
          Settings
        </NavLink>
      </div>
    </nav>
  )
}

export default NavBar
