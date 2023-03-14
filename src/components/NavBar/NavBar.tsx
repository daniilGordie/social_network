import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import s from './NavBar.module.css'

//TODO: Add the area "friends" with icons and names as a sidebar

const NavBar = (props) => {
  const isActive = ({ isActive }) => (isActive ? s.activeLink : '')
  return (
    <nav className={s.navigation}>
      <div className={`${s.item} ${s.active}`}>
        <NavLink to={'profile'} className={isActive}>
          Profile
        </NavLink>
      </div>
      <div className={`${s.item} ${s.active}`}>
        <NavLink to={'dialogs'} className={isActive}>
          Messages
        </NavLink>
      </div>
      <div className={`${s.item} ${s.active}`}>
        <NavLink to={'developers'} className={isActive}>
          Friends
        </NavLink>
      </div>
      <div className={`${s.item} ${s.active}`}>
        <NavLink to={'news'} className={isActive}>
          News
        </NavLink>
      </div>
      <div className={`${s.item} ${s.active}`}>
        <NavLink to={'music'} className={isActive}>
          Music
        </NavLink>
      </div>
      <div className={`${s.item} ${s.active}`}>
        <NavLink to={'admin'} className={isActive}>
          Settings
        </NavLink>
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, {})(NavBar)
