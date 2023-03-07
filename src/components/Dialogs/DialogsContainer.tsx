import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { actions } from '../../redux/DialogReducer.ts'
import Dialogs from './Dialogs.tsx'
import { AppStateType } from '../../redux/redux-store'

const DialogsContainer = (props) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!props.isAuth) {
      navigate('/login')
    }
  }, [props.isAuth, navigate])

  return <Dialogs {...props} />
}

let mapStateToProps = (state: AppStateType) => {
  return {
    dialogPage: state.dialogPage,
    isAuth: state.auth.isAuth,
  }
}

let mapDispathToProps = (dispatch) => {
  return {
    send: (body) => {
      dispatch(actions.sendMessage(body))
    },
  }
}

export default compose(connect(mapStateToProps, mapDispathToProps))(DialogsContainer)
