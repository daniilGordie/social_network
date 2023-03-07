import React, { useEffect } from 'react'
import Profile from './Profile.tsx'
import { connect } from 'react-redux'
import {
  getUserProfile,
  getStatus,
  updateCurrentStatus,
  savePhoto,
  saveProfileData,
} from '../../redux/ProfileReducer.ts'
import { useParams } from 'react-router-dom'

const ProfileContainer = (props) => {
  const { id } = useParams()
  //|| 27328
  useEffect(() => {
    props.getUserProfile(id || 27328)
    props.getStatus(id || 27328)
  }, [id])
  return (
    <Profile
      {...props}
      isOwner={!!27328}
      profile={props.profile}
      status={props.status}
      updateCurrentStatus={updateCurrentStatus}
      savePhoto={props.savePhoto}
      saveProfileData={props.saveProfileData}
    />
  )
}

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isAuth: state.auth.isAuth,
  status: state.profilePage.status,
})

export default connect(mapStateToProps, {
  getUserProfile,
  getStatus,
  updateCurrentStatus,
  savePhoto,
  saveProfileData,
})(ProfileContainer)
