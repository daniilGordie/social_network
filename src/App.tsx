import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css'

import HeaderContainer from './components/Header/HeaderContainer.tsx'
import NavBar from './components/NavBar/NavBar.tsx'
import UsersPageContainer from './components/UsersPage/UsersPageContainer.tsx'
import Admin from './components/Admin/Admin.tsx'
import Music from './components/Music/Music.tsx'
import News from './components/News/News.tsx'
import LoginPage from './components/Login/Login.tsx'
import DialogsContainer from './components/Dialogs/DialogsContainer.tsx'
import ProfileContainer from './components/Profile/ProfileContainer.tsx'
import { initializeApp } from './redux/app-reducer.ts'
import { AppStateType } from './redux/redux-store'

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

const App: React.FC<MapPropsType & DispatchPropsType> = () => {
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

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
})

export default connect(mapStateToProps, { initializeApp })(App)
