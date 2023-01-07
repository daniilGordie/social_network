import React, { useEffect } from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { getUserProfile } from '../../redux/ProfileReducer'
import { useParams } from 'react-router-dom'

const ProfileContainer = (props) => {
  const { id } = useParams()

  useEffect(() => {
    props.getUserProfile(id)
  }, [id])
  return <Profile {...props} profile={props.profile} />
}

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
})

export default connect(mapStateToProps, { getUserProfile })(ProfileContainer)
