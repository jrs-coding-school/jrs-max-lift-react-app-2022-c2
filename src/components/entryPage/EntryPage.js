import React from 'react'
import './EntryPage.css'
import Nav from '../Nav/Nav';
import LoginForm from './loginForm/LoginForm';
import CreateAccountForm from './createAccountForm/CreateAccountForm';
import { useState } from 'react';
import OnboardingWizard from './onboarding/OnboardingWizard';

export default function EntryPage() {

  const [isLogin, setisLogin] = useState(true);

  function toggleLoginForm() {
    setisLogin(!isLogin);
  }

  return (
    <div>
      {isLogin ? <LoginForm /> : <OnboardingWizard />}
      {isLogin
        ? <div onClick={toggleLoginForm}>New here? Create Account</div>
        : <div onClick={toggleLoginForm}>Log into existing account</div>
      }
    </div>
  )
}
