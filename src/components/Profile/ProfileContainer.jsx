import React, { useEffect } from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { getUserProfile, getStatus, updateStatus } from '../../redux/ProfileReducer'
import { useParams } from 'react-router-dom'
// import { withAuthRedirect } from '../../hoc/withAuthRedirect'

const ProfileContainer = (props) => {
  const { id } = useParams()

  useEffect(() => {
    props.getUserProfile(id || 27328)
    props.getStatus(id || 27328)
  }, [id])
  return (
    <Profile {...props} profile={props.profile} status={props.status} updateStatus={updateStatus} />
  )
}

// const AuthRedirectComponent = withAuthRedirect(ProfileContainer)

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isAuth: state.auth.isAuth,
  status: state.profilePage.status,
})

export default connect(mapStateToProps, { getUserProfile, getStatus, updateStatus })(
  ProfileContainer
)
