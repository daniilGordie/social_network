import { connect } from 'react-redux'
import { actions } from '../../../redux/ProfileReducer.ts'
import MyPosts from './MyPosts'

const mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNewPostText: (text) => {
      let action = actions.updateNewPostTextActionCreator(text)
      dispatch(action)
    },
    addPost: () => {
      dispatch(actions.addPostActionCreator())
    },
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer
