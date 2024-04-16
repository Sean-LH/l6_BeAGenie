import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  const {logout} = props
  return (
    <div className="navbar">
    <Link to="/home" className='updater'>Home</Link>
    {/* <Link to="/gifts">Gifts</Link> */}
    <button onClick={logout} className="out">Logout</button>
  </div>
  )
}
