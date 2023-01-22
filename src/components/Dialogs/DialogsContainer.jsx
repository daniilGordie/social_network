import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { sendMessage } from '../../redux/DialogReducer'
import Dialogs from './Dialogs'

const DialogsContainer = (props) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!props.isAuth) {
      navigate('/login')
    }
  }, [props.isAuth, navigate])

  return <Dialogs {...props} />
}

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

export default compose(connect(mapStateToProps, mapDispathToProps))(DialogsContainer)
