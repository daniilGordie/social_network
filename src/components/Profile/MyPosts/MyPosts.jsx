import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'

function MyPosts() {
  return (
    <div className={s.posts_block}>
      <div>
        <h3>My posts</h3>
      </div>
      <div>
        <textarea></textarea>
      </div>
      <div>
        <button>Add Post</button>
      </div>
      <div className={s.posts}>
        <Post message="Hi, how are you?" likeAmount={4} />
        <Post message="It's my first post" likeAmount={1} />
        <Post message="I'm learning react" likeAmount={0} />
        <Post message="Would you want to learn react?" likeAmount={5} />
      </div>
    </div>
  )
}

export default MyPosts
