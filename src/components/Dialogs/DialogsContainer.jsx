import React from 'react'

import {
  sendMessageCreator,
  updateNewMessageBodyCreator,
} from '../../redux/DialogReducer'
import Dialogs from './Dialogs'

const DialogsContainer = (props) => {
  debugger
  let state = props.store.getState().dialogPage

  let onSendMessageClick = () => {
    props.dispatch(sendMessageCreator())
  }

  let onNewMessageChange = (body) => {
    props.store.dispatch(updateNewMessageBodyCreator(body))
  }

  return (
    <Dialogs
      updateNewMessageBody={onNewMessageChange}
      sendMessage={onSendMessageClick}
      dialogPage={state}
    />
  )
}

export default DialogsContainer
