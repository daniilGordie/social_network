import React, { useState } from 'react'
import Preloader from '../../common/Preloader/Preloader.tsx'
import s from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus.tsx'
import ProfileData from './ProfileData/ProfileData.tsx'
import terminator from './../../../assets/4837857.png'
import ProfileDataForm from './ProfileDataForm/ProfileDataForm.tsx'

function ProfileInfo({
  status,
  updateCurrentStatus,
  profile,
  isOwner,
  savePhoto,
  saveProfileData,
}) {
  const [editMode, setEditMode] = useState(false)

  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

  const goToEditMode = () => {
    setEditMode(true)
  }

  const goOutFromEditMode = () => {
    setEditMode(false)
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
        {editMode ? (
          <ProfileDataForm
            profile={profile}
            saveProfileData={saveProfileData}
            goOutFromEditMode={goOutFromEditMode}
          />
        ) : (
          <ProfileData profile={profile} isOwner={isOwner} goToEditMode={goToEditMode} />
        )}

        <ProfileStatus status={status} updateCurrentStatus={updateCurrentStatus} />
      </div>
    </div>
  )
}

export default ProfileInfo
