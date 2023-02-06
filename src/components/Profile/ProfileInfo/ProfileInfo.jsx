import React from 'react'
import Preloader from '../../common/Preloader/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus'
import ProfileData from './ProfileData/ProfileData'
import terminator from './../../../assets/4837857.png'

function ProfileInfo({ status, updateCurrentStatus, profile, isOwner, savePhoto }) {
  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }
  return (
    <div>
      <div className={s.description_block}>
        <img
          src={profile.photos.small || terminator}
          alt="user avatar"
          className={s.avatar_photo}
        />
        {!isOwner || <input type={'file'} onChange={onMainPhotoSelected} />}
        <ProfileData profile={profile} />
        <ProfileStatus status={status} updateCurrentStatus={updateCurrentStatus} />
      </div>
    </div>
  )
}

export default ProfileInfo
