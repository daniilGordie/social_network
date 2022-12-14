import React from 'react'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'

function Profile(props) {
  return (
    <div>
      <ProfileInfo {...props} profile={props.profile} />
      <MyPostsContainer />
    </div>
  )
}

export default Profile
