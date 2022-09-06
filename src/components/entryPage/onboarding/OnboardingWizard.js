import React from 'react'
import './OnboardingWizard.css'
import { useEffect } from 'react';
import { useState } from 'react'

export default function OnboardingWizard() {

    const [user, setUser] = useState({
        // id: '',
        username: '',
        password: '',
        height: 0, // inches
        weight: 0, // weight
        age: 0, // years
        sex: '' // 'm' / 'f'
    })
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        // <CreateAccountForm user={user} setUser={setUser} />,
        <UsernamePasswordStep nextStep={nextStep} output={setUserNamePass} />,
        <HeightStep nextStep={nextStep} prevStep={prevStep} output={setHeight} />,
        <AgeSexStep nextStep={nextStep} prevStep={prevStep} output={setSexAge} />,
        <WeightStep nextStep={nextStep} prevStep={prevStep} output={setWeight} />
    ]

    function nextStep() {
        setCurrentStep(currentStep + 1);
    }

    function prevStep() {
        setCurrentStep(currentStep - 1);
    }

    function setUserNamePass(username, password) {
        setUser({
            ...user,
            username,
            password
        })
    }

    function setHeight(height) {
        setUser({
            ...user,
            height
        });
    }

    function setSexAge(sex, age) {
        setUser({
            ...user,
            sex,
            age
        })
    }

    function setWeight(weight) {
        setUser({
            ...user,
            weight
        })
    }

    function submitNewUser() {
        // clean up the user first
        // http.post -> create new user(user);
    }

    useEffect(() => {
        console.log(user);
    }, [user])
    return (
        <div className='wizard-root'>
            <div className='wizard-view'>
                {steps[currentStep]}
            </div>
        </div>
    )
}

function UsernamePasswordStep({ nextStep, output }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isPasswordVisible, setisPasswordVisible] = useState(false)

    function handleFormSubmit(e) {
        e.preventDefault();
        // 'output' height in inches total
        output(username, password)

        nextStep && nextStep();
    }

    function handleUsernameChange(e) {
        const { name, value } = e.target;
        setUsername(value)
    }

    function handlePasswordChange(e) {
        const { name, value } = e.target;
        setPassword(value)
    }

    return (
        <div>
            <h4>Create Account</h4>
            <form onSubmit={handleFormSubmit}>
                <input
                    type='text'
                    placeholder="username"
                    name='username'
                    value={username}
                    onChange={handleUsernameChange}
                    required
                />
                <input
                    type={isPasswordVisible
                        ? 'text'
                        : 'password'}
                    placeholder="password"
                    name='password'
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />

                <label>show password</label>
                <input
                    type='checkbox'
                    name='isPassWordVisible'
                    value={isPasswordVisible}
                    onChange={() => {
                        setisPasswordVisible(!isPasswordVisible)
                    }}
                />

                <button type="submit">next</button>
            </form>
        </div>
    )
}

function HeightStep({ nextStep, output, prevStep }) {


    // This is an array filled with objects for the <select/> tag with the heights.
    // it conatains the format to be displayed and also the value in inches
    let heights = [];
    for (let i = 2; i < 9; i++) {
        for (let k = 0; k < 12; k++) {
            heights.push({ value: (i * 12 + k), label: `${i}'${k}"` })
        }
    }

    // const heights = [
    //     {
    //         value: 70,
    //         label: `5'10"`
    //     },
    //     {
    //         value: 69,
    //         label: `5'9"`
    //     },
    //     {
    //         value: 68,
    //         label: `5'8"`
    //     },
    //     {
    //         value: 67,
    //         label: `5'7"`
    //     },
    // ]

    const [feet, setFeet] = useState(5);
    const [inches, setInches] = useState(8);

    function onInputChange(e) {
        const { name, value } = e.target;

        if (name == 'feet') {
            setFeet(value)
        } else if (name == 'inches') {
            setInches(value)
        }
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        // 'output' height in inches total
        output(Number((feet) * 12) + Number(inches))
        nextStep && nextStep();
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <h4>Height</h4>

            <select>
                {heights.map(h => (
                    <option value={h.value}>{h.label}</option>
                ))}
            </select>


            <label>feet:</label>
            <input
                type='number'
                placeholder="6'"
                name="feet"
                value={feet}
                onChange={onInputChange}
                required
            />

            <label>inches:</label>
            <input
                type='number'
                placeholder='6"'
                name="inches"
                value={inches}
                onChange={onInputChange}
                required
            />

            <button type='button' onClick={prevStep}>prev</button>
            <button type='submit' value='submit'>
                next
            </button>
        </form>
    )
}

function AgeSexStep({ nextStep, output, prevStep }) {

    const [mOrF, setMOrF] = useState('')
    const [age, setAge] = useState(0)

    function handleFormSubmit(e) {
        e.preventDefault();
        nextStep && nextStep();
        output(mOrF, age)
    }

    function handleAgeChange(e) {
        const { name, value } = e.target;
        setAge(value)
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <h4>Age and Sex
            </h4>

            <label>Age</label>
            <input
                type='number'
                placeholder="25"
                name='age'
                value={age}
                onChange={handleAgeChange}
                required
            />


            <div className='multi-option-group'>
                <div className={`option ${mOrF == 'm' ? 'active' : ''}`} onClick={() => {
                    setMOrF('m')
                }}>
                    Male
                </div>
                <div className={`option ${mOrF == 'f' ? 'active' : ''}`} onClick={() => {
                    setMOrF('f')
                }}>
                    Female
                </div>
            </div>

            <button type='button' onClick={prevStep}>prev</button>
            <button type='submit'>next</button>
        </form>
    )
}

function WeightStep({ nextStep, prevStep, output }) {

    const [weight, setWeight] = useState(0)

    function handleFormSubmit(e) {
        e.preventDefault();
        output(weight)

        nextStep && nextStep();
    }

    function handleWeightChange(e) {
        const { name, value } = e.target;

        setWeight(value)
    }
    return (
        <form onSubmit={handleFormSubmit}>
            <h4>Body Weight in lbs</h4>

            <label>weight</label>
            <input
                type='number'
                placeholder="lbs"
                name='weight'
                value={weight}
                onChange={handleWeightChange}
                required
            />

            <button type='button' onClick={prevStep}>prev</button>
            <button type='submit'>next</button>
        </form>
    )
}