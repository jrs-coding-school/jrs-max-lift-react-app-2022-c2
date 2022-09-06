import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faDumbbell, faHouse } from '@fortawesome/free-solid-svg-icons'

export default function Nav() {

  return (
    <nav>
      <div class="left">
        <Link to='/home'>
          <FontAwesomeIcon icon={faHouse} />
        </Link>
        <Link to="/progress"> PRs&nbsp;
          <FontAwesomeIcon icon={faDumbbell} />
        </Link>
        <Link to="/history"> History&nbsp;
          <FontAwesomeIcon icon={faBook} />
        </Link>
      </div>

      <div className="right">
        <button className="login">
          <Link to="/login">Log in</Link>
        </button>
      </div>
    </nav>

  )
}
