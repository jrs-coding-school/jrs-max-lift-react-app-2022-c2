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
    <div>LoginForm</div>
  )


}
