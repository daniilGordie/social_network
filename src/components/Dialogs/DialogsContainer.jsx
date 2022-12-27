import React from 'react'
import { connect } from 'react-redux'
import {
  sendMessageCreator,
  updateNewMessageBodyCreator,
} from '../../redux/DialogReducer'
import Dialogs from './Dialogs'

let mapStateToProps = (state) => {
  return { dialogPage: state.dialogPage }
}

let mapDispathToProps = (dispatch) => {
  return {
    sendMessage: () => {
      dispatch(sendMessageCreator())
    },
    updateNewMessageBody: (body) => {
      dispatch(updateNewMessageBodyCreator(body))
    },
  }
}

const DialogsContainer = connect(mapStateToProps, mapDispathToProps)(Dialogs)

export default DialogsContainer
