import { useState, useEffect, useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes, Route, Navigate} from 'react-router-dom'
import {UserContext} from './Context/UserProvider'
import AuthPage from './Components/AuthPage'
import Navbar from './Components/Navbar'
import HomePage from './Components/HomePage'
import Gifts from './Components/Gifts'



function App() {

  const {token, logout} = useContext(UserContext)

  return (
    <>
      <div className='app'>
      {token && <Navbar logout = {logout}/>}
        <Routes>
          <Route
            path='/' 
            element={token ? <Navigate to = '/home'/> : <AuthPage/>}
            />
          <Route
            path='/home'
            // element={!token? <Navigate to="/"/>: <HomePage/>}
            element={ <HomePage/>}
            />
          <Route
            path='/gifts/:wisherId'
            element={!token? <Navigate to="/"/>: <Gifts/>}
            />
        </Routes>
      </div>
    </>
  )
}

export default App
