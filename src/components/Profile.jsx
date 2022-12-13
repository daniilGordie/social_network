import React from 'react'
import s from './Profile.module.css'

function MainContent() {
  return (
    <div className={s.appContent}>
      <img
        src="https://fullhdoboi.ru/wp-content/uploads/_ph/20/850944591.jpg"
        alt="banner"
      />
      <div>ava + descr</div>
      <div>My posts</div>
      <div>New Post</div>
      <div className={s.posts}>
        <div className={s.item}>Post 1</div>
        <div className={s.item}>Post 2</div>
      </div>
    </div>
  )
}

export default MainContent
