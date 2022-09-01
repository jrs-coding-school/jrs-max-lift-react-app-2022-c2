import React from 'react'
import { useState } from 'react';
import './LoginForm.css'

export default function LoginForm() {

  const [user, setUser] = useState({
    username: '',
    password: ''
  })

  function handleEntryFormChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }

  return (
    <div>
      <h4>Log in</h4>

      <label>Username: </label>
      <input
        type='text'
        name='username'
        value={user.username}
        onChange={handleEntryFormChange}
      />

      <label>Password: </label>
      <input
        type='password'
        name='password'
        value={user.password}
        onChange={handleEntryFormChange}
      />

    </div>
  )
}
