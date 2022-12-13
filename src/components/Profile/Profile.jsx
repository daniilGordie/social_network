import React from 'react'
import MyPosts from './MyPosts/MyPosts'
import s from './Profile.module.css'

function Profile() {
  return (
    <div className={s.content}>
      <img
        src="https://fullhdoboi.ru/wp-content/uploads/_ph/20/850944591.jpg"
        alt="banner"
        className={s.banner}
      />
      <div>ava + descr</div>
      <MyPosts />
    </div>
  )
}

export default Profile
