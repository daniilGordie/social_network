import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import HeaderContainer from './components/Header/HeaderContainer'
import NavBar from './components/NavBar/NavBar'
import UsersPageContainer from './components/UsersPage/UsersPageContainer'
import Admin from './components/Admin/Admin'
import Music from './components/Music/Music'
import News from './components/News/News'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import ProfileContainer from './components/Profile/ProfileContainer'

function App(props) {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <HeaderContainer />
        <NavBar />
        <div className="app-wrapper-content">
          <Routes>
            <Route path="profile" element={<ProfileContainer />} />
            <Route path="dialogs/*" element={<DialogsContainer />} />
            <Route path="music" element={<Music />} />
            <Route path="users" element={<UsersPageContainer />} />
            <Route path="news" element={<News />} />
            <Route path="admin" element={<Admin />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
