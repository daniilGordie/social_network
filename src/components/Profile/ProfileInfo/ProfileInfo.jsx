import React from 'react'
import Preloader from '../../common/Preloader/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus'

function ProfileInfo(props) {
  if (!props.profile) {
    return <Preloader />
  }
  return (
    <div>
      <div className={s.description_block}>
        {/* <img src={props.profile.photos.small} alt="user avatar" /> */}
        <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
      </div>
    </div>
  )
}

export default ProfileInfo
