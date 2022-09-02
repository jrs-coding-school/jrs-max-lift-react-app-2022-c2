import React from 'react'
import { useState } from 'react';
import LiftForm from '../liftForm/LiftForm';
import './HomePage.css'

export default function HomePage() {
    const [workout, setWorkout] = useState({
        // this needs to be the table `excersises` from sql. also need more parameters
        name: 'Squat',
        weight: 0,
        reps: 0,
    })
    const [oneRepMax, setOneRepMax] = useState(0)

    function handleCalcClick(e) {
        setOneRepMax(Math.floor(workout.weight * (1 + workout.reps / 30)));
    }

    return (
        <div>

            <h1>Title</h1>

            <h4></h4>

            <LiftForm workout={workout} setWorkout={setWorkout} />

            <h3>One rep max: {oneRepMax}lb</h3>

            <button onClick={handleCalcClick}>
                Calculate
            </button>
        </div>
    )
}
