import React from 'react'
import s from './Dialogs.module.css'

import Message from './Message/Messsage'
import DialogItem from './DialogItem/DialogItem'
import {
  sendMessageCreator,
  updateNewMessageBodyCreator,
} from '../../redux/store'

const Dialogs = (props) => {
  let state = props.store.getState().dialogPage

  const dialogsElements = state.dialogData.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} />
  ))

  const messagesElements = state.messagesData.map((m) => (
    <Message message={m.message} />
  ))

  const newMessageBody = state.newMessageBody

  let onSendMessageClick = () => {
    props.store.dispatch(sendMessageCreator())
  }

  let onNewMessageChange = (e) => {
    let body = e.target.value
    props.store.dispatch(updateNewMessageBodyCreator(body))
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
