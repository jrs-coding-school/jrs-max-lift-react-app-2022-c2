import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

export default function OnboardingWizard() {

    const [user, setUser] = useState({
        id: '',
        username: '',
        password: '',
        height: 68, // inches
        weight: 195, // weight
        age: 0, // years
        gender: '' // 'm' / 'f'
    })
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        // <CreateAccountForm user={user} setUser={setUser} />,
        <UsernamePasswordStep nextStep={nextStep} />,
        <HeightStep nextStep={nextStep} output={setHeight} />,
        <></>
    ]

    function nextStep() {
        setCurrentStep(currentStep + 1);
    }

    function setHeight(height) {
        setUser({
            ...user,
            height
        });
        console.log("NEW height: ", height)
    }

    function submitNewUser() {
        // clean up the user first
        // http.post -> create new user(user);
    }

    useEffect(() => {
        console.log(user);
    }, [user])
    return (
        <div>
            <div className='wizard-view'>
                {steps[currentStep]}
            </div>
        </div>
    )
}

function UsernamePasswordStep({ nextStep }) {
    return (
        <form>
            <input type='text' placeholder="username" />
            <input type='text' placeholder="password" />

            <button onClick={nextStep}>next</button>
        </form>
    )
}

function HeightStep({ nextStep, output }) {

    const [feet, setFeet] = useState(5);
    const [inches, setInches] = useState(8);

    function onInputChange(e) {
        const [name, value] = e.target;
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        // 'output' height in inches total
        output((feet * 12) + inches)
        nextStep && nextStep();
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <input
                type='number'
                placeholder="6'"
                name="feet"
                value={feet}
                onChange={onInputChange}
            />

            <input
                type='number'
                placeholder='6"'
                name="inches"
                value={inches}
                onChange={onInputChange}
            />

            <button>next</button>
        </form>
    )
}

function AgeSexStep({ nextStep }) {



    return (
        <form>
            <input type='number' placeholder="6'" />

            <div>
                <div>m</div>
                <div>f</div>
            </div>

            <button onClick={nextStep}>next</button>
        </form>
    )
}