import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faDumbbell, faHouse } from '@fortawesome/free-solid-svg-icons'

export default function Nav() {

  return (
    <nav>
      <div className="left">
        <Link className='link' to='/home'>
          <FontAwesomeIcon icon={faHouse} />
        </Link>
        <Link className='link' to="/progress"> PRs&nbsp;
          <FontAwesomeIcon icon={faDumbbell} />
        </Link>
        <Link className='link' to="/history"> History&nbsp;
          <FontAwesomeIcon icon={faBook} />
        </Link>
      </div>

      <div className="right">
        <Link className='link' to="/login">
          <button className="login">
            Log in
          </button>
        </Link>
      </div>
    </nav>

  )
}
