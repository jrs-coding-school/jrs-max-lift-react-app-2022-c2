import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faDumbbell, faHouse } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../App'

export default function Nav() {

  const { activeUser } = useContext(UserContext)

  return (
    <nav>
      <div className="left">
        <Link className='link' to='/home'>
          <FontAwesomeIcon icon={faHouse} />
        </Link>
        <Link className='link' to="/progress">
          <span>
            PRs
          </span>
          <FontAwesomeIcon icon={faDumbbell} />
        </Link>
        <Link className='link' to="/history">
          <span>
            History
          </span>
          <FontAwesomeIcon icon={faBook} />
        </Link>
      </div>

      <div className="right">
        {!activeUser && <Link className='link' to="/login">
          <button className="login">
            Log in
          </button>
        </Link>}
        {activeUser && <div>{activeUser.username}</div>}
      </div>
    </nav>

  )
}
