import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'

function MyPosts() {
  return (
    <>
      <div>My posts</div>
      <textarea></textarea>
      <button>Add Post</button>
      <div className={s.posts}>
        <Post message="Hi, how are you?" likeAmount={4} />
        <Post message="It's my first post" likeAmount={1} />
        <Post message="I'm learning react" likeAmount={0} />
        <Post message="Would you want to learn react?" likeAmount={5} />
      </div>
    </>
  )
}

export default MyPosts
