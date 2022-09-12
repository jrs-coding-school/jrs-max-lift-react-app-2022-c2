import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { UserContext } from '../../../App';
import './LoginForm.css'
import http from '../../../services/http.service'
import { useNavigate } from 'react-router-dom';

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

  useEffect(() => {
    // storing input name
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <div className='login-form'>
      <form onSubmit={handleFormSubmit}>
        <h4>Sign In</h4>

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

          <div className='label-input-group'>
            <label>Password: </label>
            <input className='text-box'
              type={!isPasswordVisible ? 'password' : 'text'}
              name='password'
              value={user.password}
              onChange={handleEntryFormChange}
              placeholder="password"
            />
          </div>
        </div>

        {isPasswordVisible
          ? <div onClick={() => setisPasswordVisible(!isPasswordVisible)}>hide</div>
          : <div onClick={() => setisPasswordVisible(!isPasswordVisible)}>show</div>
        }

        <button type='submit'
          className='primary'>Log in</button>
      </form>

    </div>
  )
}