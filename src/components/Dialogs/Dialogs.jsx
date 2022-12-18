import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Dialogs.module.css'

const isActive = ({ isActive }) => (isActive ? s.active : '')

const DialogItem = (props) => {
  let path = JSON.stringify(props.id)
  return (
    <div className={s.dialog}>
      <NavLink to={path} className={isActive}>
        {props.name}
      </NavLink>
    </div>
  )
}

const Message = (props) => {
  return <div className={s.message}>{props.message}</div>
}

const Dialogs = (props) => {
  const dialogData = [
    {
      id: 1,
      name: 'Dimych',
    },
    {
      id: 2,
      name: 'Dimasic',
    },
    {
      id: 3,
      name: 'Dima',
    },
  ]

  const messagesData = [
    {
      id: '1',
      message: 'Hi',
    },
    {
      id: '2',
      message: 'How are you',
    },
    {
      id: '3',
      message: 'Ready-Go',
    },
  ]

  const dialogsElements = dialogData.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} />
  ))

  const messagesElements = messagesData.map((messages) => (
    <Message message={messages.message} />
  ))

  return (
    <div className={s.dialogs}>
      <div className={s.dialogs_item}>{dialogsElements}</div>
      <div className={s.messages}>{messagesElements}</div>
    </div>
  )
}

export default Dialogs
