import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './../Dialogs.module.css'

const DialogItem = (props) => {
  const isActive = ({ isActive }) => (isActive ? s.active : '')

  let path = JSON.stringify(props.id)

  return (
    <div className={s.dialog}>
      <NavLink to={path} className={isActive}>
        {props.name}
      </NavLink>
    </div>
  )
}

export default DialogItem
