import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css'

import HeaderContainer from './components/Header/HeaderContainer'
import NavBar from './components/NavBar/NavBar'
import UsersPageContainer from './components/UsersPage/UsersPageContainer.tsx'
import Admin from './components/Admin/Admin'
import Music from './components/Music/Music'
import News from './components/News/News'
import LoginPage from './components/Login/Login'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import ProfileContainer from './components/Profile/ProfileContainer'
import { initializeApp } from './redux/appReducer.ts'

function App(props) {
  useEffect(() => {
    initializeApp()
  })

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <HeaderContainer />
        <NavBar />
        <div className="app-wrapper-content">
          <Routes>
            <Route path="profile/:id" element={<ProfileContainer />} />
            <Route path={'/dialogs/*'} element={<DialogsContainer />} />
            <Route path="music" element={<Music />} />
            <Route path="users" element={<UsersPageContainer />} />
            <Route path="news" element={<News />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="admin" element={<Admin />} />
            <Route path="*" element={<ProfileContainer />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
})

export default connect(mapStateToProps, { initializeApp })(App)
