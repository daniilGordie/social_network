import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'

function MyPosts(props) {
  let postElements = props.posts.map((p) => (
    <Post message={p.message} likeAmount={p.likeAmount} />
  ))

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
      <div className={s.posts}>{postElements}</div>
    </div>
  )
}

export default MyPosts
