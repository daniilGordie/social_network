import React from 'react'
import s from './ProfileInfo.module.css'

function ProfileInfo() {
  return (
    <div>
      <img
        src="https://fullhdoboi.ru/wp-content/uploads/_ph/20/850944591.jpg"
        alt="banner"
        className={s.banner}
      />
      <div className={s.description_block}>ava + descr</div>
    </div>
  )
}

export default ProfileInfo
