import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

export default function Nav() {
  return (
    <div>
      {/* all links
      home
      progress
      how to page????
      login <-- link to entry page
      */}
      <Link to="/">Home</Link>
      <Link to="/progress">Progress</Link>
      <Link to="/history">History</Link>
      <Link to="/login">Log in</Link>
    </div>
  )
}
