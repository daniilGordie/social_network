import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import Header from './components/Header/Header'
import Profile from './components/Profile/Profile'
import NavBar from './components/NavBar/NavBar'
import Dialogs from './components/Dialogs/Dialogs'
import Admin from './components/Admin/Admin'
import Music from './components/Music/Music'
import News from './components/News/News'

function App(props) {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <NavBar />
        <div className="app-wrapper-content">
          <Routes>
            <Route path="/" element={<Profile posts={props.posts} />} />
            <Route
              path="dialogs/*"
              element={
                <Dialogs
                  dialogData={props.dialogData}
                  messagesData={props.messagesData}
                />
              }
            />
            <Route path="music" element={<Music />} />
            <Route path="news" element={<News />} />
            <Route path="admin" element={<Admin />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
