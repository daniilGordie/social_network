import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './NavBar.module.css'

//TODO: Add the area "friends" with icons and names as a sidebar

const NavBar = () => {
  const isActive = ({ isActive }) => (isActive ? s.active : '')
  return (
    <nav className={s.navigation}>
      <div className={s.item}>
        <NavLink to={'/'} className={isActive}>
          Profile
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to={'dialogs'} className={isActive}>
          Messages
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to={'users'} className={isActive}>
          Friends
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to={'news'} className={isActive}>
          News
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to={'music'} className={isActive}>
          Music
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to={'admin'} className={isActive}>
          Settings
        </NavLink>
      </div>
    </nav>
  )
}

export default NavBar
