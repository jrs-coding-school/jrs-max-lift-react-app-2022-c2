import React from 'react'
import './OnboardingWizard.css'
import { useEffect } from 'react';
import { useState } from 'react'
import { useContext } from 'react';
import { UserContext } from '../../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import http from '../../../services/http.service';
import { useNavigate } from 'react-router-dom';

export default function OnboardingWizard() {

    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: '',
        password: '',
        height: 0, // inches
        weight: 0, // lbs
        age: 0, // years
        sex: '' // 'm' / 'f'
    })

    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        <UsernamePasswordStep nextStep={nextStep} output={setUserNamePass} />,
        <HeightStep nextStep={nextStep} prevStep={prevStep} output={setHeight} />,
        <AgeSexStep nextStep={nextStep} prevStep={prevStep} output={setSexAge} />,
        <WeightStep prevStep={prevStep} output={(setWeight)} />
    ]

    useEffect(() => {
        console.log(user.weight)
        if (user.weight) {
            // last step was submitted
            submitNewUser();
        }
    }, [user.weight])


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
        http.signup(user)
            .then(res => {
                let newUser = res.data
                login && login(newUser)
                navigate('/history')
            })
            .catch(err => {
                console.error(err)
            })
    }

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
        setPassword(e.target.value)
    }

    return (
        <div className='create-account login-form' >
            <form onSubmit={handleFormSubmit}>
                <h4 className='create-account-headers'>
                    Create Account
                </h4>

                <div className='inputs-container'>

                    <div className='label-input-group'>
                        <label>Username: </label>
                        <input className='text-box'
                            type='text'
                            name='username'
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder="username"
                        />
                    </div>

                    <div className='label-input-group password-input-container'>
                        <label>Password:</label>
                        <input className='text-box'
                            type={!isPasswordVisible ? 'password' : 'text'}
                            name='password'
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="password"
                        />
                        <div className='eye' onClick={() => setisPasswordVisible(!isPasswordVisible)}>
                            <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
                        </div>
                    </div>


                    <button className='primary' type="submit">
                        next <FontAwesomeIcon icon={faChevronRight} />
                    </button>

                </div>
            </form>
        </div >
    )
}

function HeightStep({ nextStep, output, prevStep }) {


    // This is an array filled with objects for the <select/> tag with the heights.
    // {value: number, label: string}[]
    // label: ft'in"
    let heights = [];
    for (let i = 8; i > 2; i--) {
        for (let j = 11; j >= 0; j--) {
            heights.push({ value: ((i * 12) + j), label: `${i}'${j}"` })
        }
    }

    const [heightInInches, setHeightInInches] = useState(68) // arbitrary starting value

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
                        <option value={h.value}>
                            {h.label}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <button type='button' onClick={prevStep}>
                    <FontAwesomeIcon icon={faChevronLeft} /> prev
                </button>
                <button type='submit' value='submit'>
                    next <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </form>
    )
}

function AgeSexStep({ nextStep, output, prevStep }) {

    const [mOrF, setMOrF] = useState('m')
    const [age, setAge] = useState(25)

    function handleFormSubmit(e) {
        e.preventDefault();
        output(mOrF, age)
        nextStep && nextStep();
    }

    function handleAgeChange(e) {
        const { value } = e.target;
        setAge(value)
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <h4 className='create-account-headers' >Age and Sex
            </h4>
            <div className='age-form'>
                <label>Age</label>
                <input className="age-input"
                    type='number'
                    placeholder="25"
                    name='age'
                    value={age}
                    onChange={handleAgeChange}
                    min='0'
                    max='120'
                    required
                />
            </div>


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
            <br></br>
            <div>
                <button type='button' onClick={prevStep}>
                    <FontAwesomeIcon icon={faChevronLeft} /> prev
                </button>
                <button type='submit'>
                    next <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </form>
    )
}

function WeightStep({ nextStep, prevStep, output }) {

    const [weight, setWeight] = useState(0)

    function handleFormSubmit(e) {
        e.preventDefault();
        output(weight)

        // do not go to 'next step' 
    }

    function handleWeightChange(e) {
        const { name, value } = e.target;

        setWeight(value)
    }
    return (
        <form onSubmit={handleFormSubmit}>
            <h4 className='create-account-headers' >
                Body Weight in lbs
            </h4>
            <div className='weight-form' >
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
            </div>

            <button type='button' onClick={prevStep}>
                <FontAwesomeIcon icon={faChevronLeft} /> prev</button>
            <button type='submit'>
                Finish
            </button>
        </form>
    )
}