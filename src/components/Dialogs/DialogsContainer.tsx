import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Dialogs from './Dialogs.tsx'
import { actions } from './../../redux/dialog-reducer.ts'
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

const mapStateToProps = (state: AppStateType) => {
  return {
    dialogPage: state.dialogPage,
    isAuth: state.auth.isAuth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    send: (message: string) => {
      dispatch(actions.sendMessage(message))
    },
  }
}
export default compose(connect(mapStateToProps, mapDispatchToProps))(DialogsContainer)
