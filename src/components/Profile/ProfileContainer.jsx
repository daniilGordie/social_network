import React, { useEffect } from 'react'
import Profile from './Profile'
import axios from 'axios'
import { connect } from 'react-redux'
import { setUserProfile } from '../../redux/ProfileReducer'
import { useParams } from 'react-router-dom'
// import { useParams } from 'react-router-dom'

const ProfileContainer = (props) => {
  const { id } = useParams()

  useEffect(() => {
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`).then((response) => {
      props.setUserProfile(response.data)
    })
  }, [id])
  console.log(props.profile)
  return <Profile {...props} profile={props.profile} />
}

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
})

export default connect(mapStateToProps, { setUserProfile })(ProfileContainer)
