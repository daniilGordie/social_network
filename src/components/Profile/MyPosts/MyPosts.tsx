import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post.tsx'
import PostType from './../../../types/types.ts'

type PropsType = {
  posts: Array<PostType>
  addPost: (post: string) => void
  updateNewPostText: (text: string) => void
  newPostText: string
}

const MyPosts: React.FC<PropsType> = (props) => {
  let postElements = props.posts.map((p) => (
    <Post message={p.message} key={p.id} likeAmount={p.likeAmount} />
  ))

  let newPostElem = React.createRef()

  let onAddPost = (post: string) => {
    props.addPost(post)
  }

  let onPostChange = () => {
    let text = newPostElem.current.value
    props.updateNewPostText(text)
  }

  return (
    <div className={s.posts_block}>
      <div>
        <h3>My posts</h3>
      </div>
      <div>
        <textarea onChange={onPostChange} ref={newPostElem} value={props.newPostText} />
      </div>
      <div>
        <button onClick={onAddPost}>Add Post</button>
      </div>
      <div className={s.posts}>{postElements}</div>
    </div>
  )
}

export default MyPosts
