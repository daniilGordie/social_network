import React from 'react'
import Profile from './Profile'
import axios from 'axios'
import { connect } from 'react-redux'
import { setUserProfile } from '../../redux/ProfileReducer'
// import { useParams } from 'react-router-dom'

// const SetParams = () => {
//   let uID
//   console.log(({ uID } = useParams()))
//   return uID
// }
class ProfileContainer extends React.Component {
  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/users`).then((response) => {
      this.props.setUserProfile(response.data)
    })
  }

  render() {
    return <Profile {...this.props} profile={this.props.profile} />
  }
}

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
})

// let withURLDAtaContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, { setUserProfile })(ProfileContainer)
