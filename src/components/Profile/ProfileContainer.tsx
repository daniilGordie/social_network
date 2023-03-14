import React, { useEffect } from 'react'
import Profile from './Profile.tsx'
import { connect } from 'react-redux'
import {
  getUserProfile,
  getStatus,
  updateCurrentStatus,
  savePhoto,
  saveProfileData,
} from '../../redux/profile-reducer.ts'
import { useParams } from 'react-router-dom'
import ProfileType from './../../types/types.ts'

type DispatchPropsType = {
  getUserProfile: (id: number | null) => void
  getStatus: (id: number | null) => void
  updateCurrentStatus: (status: string) => void
  savePhoto: (file: File) => void
  saveProfileData: (profile: ProfileType) => void
}

type MapPropsType = ReturnType<typeof mapStateToProps>

const ProfileContainer: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  const { id } = useParams()
  const userID = props.userID
  console.log(userID)

  useEffect(() => {
    props.getUserProfile(userID || id)
    props.getStatus(userID || id)
  }, [id, userID])
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
  userID: state.auth.userID,
})

export default connect(mapStateToProps, {
  getUserProfile,
  getStatus,
  updateCurrentStatus,
  savePhoto,
  saveProfileData,
})(ProfileContainer)
