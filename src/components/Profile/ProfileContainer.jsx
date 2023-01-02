import React from 'react'
import Profile from './Profile'
import axios from 'axios'
import { connect } from 'react-redux'
import { setUserProfile } from '../../redux/ProfileReducer'
import { useParams } from 'react-router-dom'
// import { useParams } from 'react-router-dom'

const SetParams = () => {
  const { id } = useParams()
  return id
}
class ProfileContainer extends React.Component {
  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/users`).then((response) => {
      this.props.setUserProfile(response.data)
    })
  }

  render() {
    const id = SetParams()
    return <Profile {...this.props} profile={id} />
  }
}

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
})

export default connect(mapStateToProps, { setUserProfile })(ProfileContainer)
