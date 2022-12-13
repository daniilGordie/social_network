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

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <NavBar />
        <div className="app-wrapper-content">
          <Routes>
            <Route path="/dialogs" element={<Dialogs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/music" element={<Music />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
