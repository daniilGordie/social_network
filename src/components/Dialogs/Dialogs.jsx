import React from 'react'
import s from './Dialogs.module.css'

import Message from './Message/Messsage'
import DialogItem from './DialogItem/DialogItem'

const Dialogs = (props) => {
  const dialogsElements = props.state.dialogData.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} />
  ))

  const messagesElements = props.state.messagesData.map((m) => (
    <Message message={m.message} />
  ))

  return (
    <div className={s.dialogs}>
      <div className={s.dialogs_item}>{dialogsElements}</div>
      <div className={s.messages}>{messagesElements}</div>
    </div>
  )
}

export default Dialogs
