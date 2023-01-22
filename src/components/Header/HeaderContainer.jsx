import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { setLogout } from '../../redux/authReducer'

const HeaderContainer = (props) => {
  return <Header {...props} />
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
})

export default connect(mapStateToProps, { setLogout })(HeaderContainer)
