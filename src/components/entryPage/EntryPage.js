import React from 'react'
import './EntryPage.css'
import LoginForm from './loginForm/LoginForm';
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
        ? <div className='create-account-link' onClick={toggleLoginForm}>New here? Create account</div>
        : <div className='create-account-link' onClick={toggleLoginForm}>Sign into existing account</div>
      }
    </div>
  )
}
