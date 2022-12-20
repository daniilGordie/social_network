import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'

function MyPosts(props) {
  let postElements = props.posts.map((p) => (
    <Post message={p.message} likeAmount={p.likeAmount} />
  ))

  let newPostElem = React.createRef()

  let addPost = () => {
    props.dispatch({ type: 'ADD-POST' })
  }

  let onPostChange = () => {
    let text = newPostElem.current.value
    const action = { newText: text, type: 'UPDATE-NEW-POST-TEXT' }
    props.dispatch(action)
  }

  return (
    <div className={s.posts_block}>
      <div>
        <h3>My posts</h3>
      </div>
      <div>
        <textarea
          onChange={onPostChange}
          ref={newPostElem}
          value={props.newPostText}
        />
      </div>
      <div>
        <button onClick={addPost}>Add Post</button>
      </div>
      <div className={s.posts}>{postElements}</div>
    </div>
  )
}

export default MyPosts
