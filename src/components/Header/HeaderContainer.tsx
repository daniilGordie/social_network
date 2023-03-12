import React from 'react'
import Header from './Header.tsx'
import { connect } from 'react-redux'
import { setLogout } from '../../redux/auth-reducer.ts'

const HeaderContainer = (props) => {
  return <Header {...props} />
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
})

export default connect(mapStateToProps, { setLogout })(HeaderContainer)
