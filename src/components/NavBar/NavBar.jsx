import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './NavBar.module.css'

const NavBar = () => {
  console.log(s)
  return (
    <nav className={s.navigation}>
      <div className={s.item}>
        <NavLink to={'/profile'} activeclassname={s.active}>
          Profile
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to={'/dialogs'} activeclassname={s.active}>
          Messages
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to={'/news'} activeclassname={s.active}>
          News
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to={'/music'} activeclassname={s.active}>
          Music
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to={'/admin'} activeclassname={s.active}>
          Settings
        </NavLink>
      </div>
    </nav>
  )
}

export default NavBar
