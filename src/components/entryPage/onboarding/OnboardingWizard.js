import React from 'react'
import './OnboardingWizard.css'
import { useEffect } from 'react';
import { useState } from 'react'
import { useContext } from 'react';
import { UserContext } from '../../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';


export default function OnboardingWizard() {

    const { login } = useContext(UserContext);

    const [user, setUser] = useState({
        // id: '',
        username: '',
        password: '',
        height: 0, // inches
        weight: 0, // weight
        age: 0, // years
        sex: '' // 'm' / 'f'
    })

    useEffect(() => {
        // storing input name
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
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
        <div className='create-account' >
            <h4 className='create-account-headers' >Create Account</h4>
            <form onSubmit={handleFormSubmit}>
                <input className='text-field'
                    type='text'
                    placeholder="username"
                    name='username'
                    value={username}
                    onChange={handleUsernameChange}
                    required
                />
                <br></br>
                <input className='text-field'
                    type={isPasswordVisible
                        ? 'text'
                        : 'password'}
                    placeholder="password"
                    name='password'
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />

                {!isPasswordVisible
                    ? <div onClick={() => setisPasswordVisible(!isPasswordVisible)}><FontAwesomeIcon icon={faEyeSlash} /> </div>
                    : <div onClick={() => setisPasswordVisible(!isPasswordVisible)}><FontAwesomeIcon icon={faEye} /> </div>
                }

                <button className='primary' type="submit">next <FontAwesomeIcon icon={faChevronRight} /></button>
            </form>
        </div >
    )
}

function HeightStep({ nextStep, output, prevStep }) {


    // This is an array filled with objects for the <select/> tag with the heights.
    // it conatains the format to be displayed and also the value in inches ex. [... {value: 68, label: 5'8"} ...]
    let heights = [];
    for (let i = 8; i > 2; i--) {
        for (let j = 11; j >= 0; j--) {
            heights.push({ value: ((i * 12) + j), label: `${i}'${j}"` })
        }
    }

    const [heightInInches, setHeightInInches] = useState(68)

    function onInputChange(e) {
        const { value } = e.target;
        setHeightInInches(Number(value))
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        output(heightInInches)
        nextStep && nextStep();
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <h4 className='create-account-headers'>Height</h4>

            {/* <label>Height: </label> */}
            <div className="height-form">

                <select className='enter-height'
                    name="height"
                    value={heightInInches}
                    onChange={onInputChange}
                    required
                >
                    {heights.map(h => (
                        <option value={h.value}>{h.label}</option>
                    ))}
                </select>
            </div>

            <button type='button' onClick={prevStep}><FontAwesomeIcon icon={faChevronLeft} /> prev</button>
            <button type='submit' value='submit'>
                next <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </form>
    )
}

function AgeSexStep({ nextStep, output, prevStep }) {

    const [mOrF, setMOrF] = useState('')
    const [age, setAge] = useState('')

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
            <h4 className='create-account-headers' >Age and Sex
            </h4>

            <label>Age</label>
            <input
                type='number'
                placeholder="25"
                name='age'
                value={age}
                onChange={handleAgeChange}
                min='0'
                max='120'
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

            <button type='button' onClick={prevStep}><FontAwesomeIcon icon={faChevronLeft} /> prev</button>
            <button type='submit'>next <FontAwesomeIcon icon={faChevronRight} /></button>
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
                min='0'
                max='800'
                required
            />

            <button type='button' onClick={prevStep}><FontAwesomeIcon icon={faChevronLeft} /> prev</button>
            <button type='submit'>next <FontAwesomeIcon icon={faChevronRight} /></button>
        </form>
    )
}