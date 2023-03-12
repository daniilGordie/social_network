import React from 'react'
import s from './Header.module.css'
import { NavLink } from 'react-router-dom'

type PropsType = {
  isAuth: boolean
  login: string
  setLogout: () => void
}

const Header: React.FC<PropsType> = (props) => {
  return (
    <header className={s.appHeader}>
      <img
        src="data:image/png;base64,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"
        alt="logo"
      />
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div>
            <div>{props.login}</div>
            <button onClick={props.setLogout}>Logout</button>
          </div>
        ) : (
          <NavLink to={'/login'}>Login</NavLink>
        )}
      </div>
      <h2>OlDen Chat</h2>
    </header>
  )
}

export default Header
