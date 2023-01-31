import React from 'react'
import Preloader from '../../common/Preloader/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus'

function ProfileInfo({ status, updateCurrentStatus, profile }) {
  if (!profile) {
    return <Preloader />
  }
  return (
    <div>
      <div className={s.description_block}>
        {/* <img src={props.profile.photos.small} alt="user avatar" /> */}
        <ProfileStatus status={status} updateCurrentStatus={updateCurrentStatus} />
      </div>
    </div>
  )
}

export default ProfileInfo
