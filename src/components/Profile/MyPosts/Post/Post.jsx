import React from 'react'
import s from './Post.module.css'

function Post() {
  return (
    <>
      <div className={s.item}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJq3vveUU9r1XJFkg7rFborttCrxfwR3PojA&usqp=CAU"
          alt="avatar"
        />
        Post 1
        <div>
          <span>like</span>
        </div>
      </div>
    </>
  )
}

export default Post
