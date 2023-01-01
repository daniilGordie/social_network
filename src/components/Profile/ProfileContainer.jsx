import React from 'react'
import Profile from './Profile'
import axios from 'axios'
import { connect } from 'react-redux'
import { setUserProfile } from '../../redux/ProfileReducer'
// import { withRouter } from 'react'

class ProfileContainer extends React.Component {
  componentDidMount() {
    // let userID = this.props.match.params.userID

    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
      .then((response) => {
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
