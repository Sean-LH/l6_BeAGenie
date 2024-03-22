import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  const {logout} = props
  return (
    <div className="navbar">
    <Link to="/home">Home</Link>
    {/* <Link to="/gifts">Gifts</Link> */}
    <button onClick={logout}>Logout</button>
  </div>
  )
}
