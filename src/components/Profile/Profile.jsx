import React from 'react'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'

function Profile(props) {
  return (
    <div>
      <ProfileInfo
        {...props}
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateCurrentStatus={props.updateCurrentStatus}
        savePhoto={props.savePhoto}
        saveProfileData={props.saveProfileData}
      />
      <MyPostsContainer />
    </div>
  )
}

export default Profile
