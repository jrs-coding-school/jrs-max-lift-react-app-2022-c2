import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHouse } from '@fortawesome/free-solid-svg-icons'

export default function Nav() {
  return (

    // <i className="fa-solid fa-house"></i>

    <nav>
      <div className="left">
        <Link to="/home">Home</Link>
        <Link to="/progress">Progress</Link>
        <Link to="/history">History</Link>
      </div>

      <div className="right">
        <button className="login">
          <Link to="/login">Log in</Link>
        </button>
      </div>
    </nav>

  )
}
