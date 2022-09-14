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
    <div className='entry-page-root'>
      {isLogin ? <LoginForm /> : <OnboardingWizard />}

      <p className='create-account-link' onClick={toggleLoginForm}>
        {isLogin ? 'New here? Create account' : 'Sign into existing account'}
      </p>

    </div>
  )
}
