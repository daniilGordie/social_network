import React from 'react'
import s from './Dialogs.module.css'

import Message from './Message/Messsage'
import DialogItem from './DialogItem/DialogItem'

const Dialogs = (props) => {
  let state = props.dialogPage

  let dialogsElements = state.dialogData.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} />
  ))

  let messagesElements = state.messagesData.map((m) => (
    <Message message={m.message} />
  ))

  const newMessageBody = state.newMessageBody

  let onSendMessageClick = () => {
    props.sendMessage()
  }

  let onNewMessageChange = (e) => {
    let body = e.target.value
    props.updateNewMessageBody(body)
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogs_item}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <div>
          <div>
            <textarea
              value={newMessageBody}
              onChange={onNewMessageChange}
              placeholder="enter your message"
            ></textarea>
          </div>
          <div>
            <button onClick={onSendMessageClick}>Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dialogs
