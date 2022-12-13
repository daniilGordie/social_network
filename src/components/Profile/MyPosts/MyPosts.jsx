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
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </>
  )
}

export default MyPosts
