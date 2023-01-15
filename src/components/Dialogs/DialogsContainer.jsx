import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { sendMessage } from '../../redux/DialogReducer'
import Dialogs from './Dialogs'
// import { withAuthRedirect } from '../../hoc/withAuthRedirect'

let mapStateToProps = (state) => {
  return {
    dialogPage: state.dialogPage,
    isAuth: state.auth.isAuth,
  }
}

let mapDispathToProps = (dispatch) => {
  return {
    send: (body) => {
      dispatch(sendMessage(body))
    },
  }
}
//TODO: refactor component for HOC auth
//  withAuthRedirect

export default compose(connect(mapStateToProps, mapDispathToProps))(Dialogs)
