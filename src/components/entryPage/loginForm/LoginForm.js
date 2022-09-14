import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { UserContext } from '../../../App';
import './LoginForm.css'
import http from '../../../services/http.service'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


export default function LoginForm() {

  const { login } = useContext(UserContext)
  const [isPasswordVisible, setisPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    password: ''
  })

  function handleEntryFormChange(e) {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }

  function handleFormSubmit(e) {

    e.preventDefault();

    http.login(user)
      .then(response => {
        let user = response.data;
        login(user);
        navigate("/home")
      })
      .catch(() => { })
  }

  return (
    <div className='login-form'>
      <form onSubmit={handleFormSubmit}>
        <h4>Log In</h4>

        <div className='inputs-container'>
          <div className='label-input-group'>
            <label>Username: </label>
            <input className='text-box'
              type='text'
              name='username'
              value={user.username}
              onChange={handleEntryFormChange}
              placeholder="username"
            />
          </div>

          <div className='label-input-group password-input-container'>
            <label>Password: </label>
            <input className='text-box'
              type={!isPasswordVisible ? 'password' : 'text'}
              name='password'
              value={user.password}
              onChange={handleEntryFormChange}
              placeholder="password"
            />
            <div className='eye' onClick={() => setisPasswordVisible(!isPasswordVisible)}>
              <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
            </div>
          </div>
          <button type='submit'
            className='primary login'>
            Log in
          </button>
        </div>


      </form>
    </div>
  )
}