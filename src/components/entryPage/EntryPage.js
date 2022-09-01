import React from 'react'
import './EntryPage.css'
import Nav from '../Nav/Nav';
import LoginForm from './loginForm/LoginForm';
import CreateAccountForm from './createAccountForm/CreateAccountForm';
import { useState } from 'react';

export default function EntryPage() {

  const [isLogin, setisLogin] = useState(true);

  function toggleLoginForm() {
    setisLogin(!isLogin);
  }

  return (
    <div>
      <Nav />
      {isLogin ? <LoginForm /> : <CreateAccountForm />}
      {isLogin 
      ? <div onClick={toggleLoginForm}>New here? Create Account</div>
      : <div onClick={toggleLoginForm}>Or Log into existing account</div>
      }
    </div>
  )
}
