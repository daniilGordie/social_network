import React from 'react'
import Preloader from '../../common/Preloader/Preloader'
import s from './ProfileInfo.module.css'

function ProfileInfo(props) {
  if (!props.profile) {
    return <Preloader />
  }

  return (
    <div>
      <img
        src="https://fullhdoboi.ru/wp-content/uploads/_ph/20/850944591.jpg"
        alt="banner"
        className={s.banner}
      />
      <div className={s.description_block}>
        {/* <img src={props.profile.photos.small} alt="user avatar" /> */}
      </div>
      <div>{props.profile.fullName}</div>
    </div>
  )
}

export default ProfileInfo
