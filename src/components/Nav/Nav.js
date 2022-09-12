import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faDumbbell, faHouse } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../App'

export default function Nav({ logout }) {

  const { activeUser } = useContext(UserContext)

  let userCheck = false

  try {
    if (activeUser.username !== undefined || activeUser.username !== '') {
      userCheck = true;
    }
  } catch (error) {
    if (activeUser) {
      userCheck = true;
    }
  }

  useEffect(() => {
    console.log(activeUser?.username)

  }, [activeUser])


  return (
    <nav>
      <div className="left">
        <Link className='link' to='/home'>
          <FontAwesomeIcon icon={faHouse} />
        </Link>
        <Link className='link' to={userCheck ? '/progress' : '/login'}>
          <span>
            PRs
          </span>
          <FontAwesomeIcon icon={faDumbbell} />
        </Link>
        <Link className='link' to={userCheck ? '/history' : '/login'}>
          <span>
            History
          </span>
          <FontAwesomeIcon icon={faBook} />
        </Link>
      </div>

      <div className="right">
        {!userCheck
          ? <Link className='link' to="/login">
            <button className="login">
              Log in
            </button>
          </Link>
          : <button onClick={logout} >logout</button>
        }
        {userCheck && <div className='username'>{activeUser?.username}
        </div>}
      </div>
    </nav>

  )
}
