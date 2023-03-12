import React from 'react'
import s from './Post.module.css'

type PropsType = {
  likeAmount: number
  message: string
}

const Post: React.FC<PropsType> = (props) => {
  return (
    <>
      <div className={s.item}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJq3vveUU9r1XJFkg7rFborttCrxfwR3PojA&usqp=CAU"
          alt="avatar"
          className={s.img}
        />
        {props.message}
        <div>
          <span>like {props.likeAmount}</span>
        </div>
      </div>
    </>
  )
}

export default Post
