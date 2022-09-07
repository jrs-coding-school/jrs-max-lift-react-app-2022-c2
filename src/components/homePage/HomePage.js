import React from 'react'
import { useState } from 'react';
import LiftForm from '../liftForm/LiftForm';
import './HomePage.css'

export default function HomePage() {
    const [workout, setWorkout] = useState({
        // this needs to be the table `excersises` from sql. also need more parameters
        id: "",
        name: '',
        weight: 0,
        reps: 0,
    })

    var oneRepMax = Math.floor(workout.weight * (1 + workout.reps / 30))

    return (
        <div>

            <h1>Calculate 1 Rep Max</h1>

            <LiftForm workout={workout} setWorkout={setWorkout} />

            <h3>{workout.name} one rep max: {oneRepMax} lbs</h3>

        </div>
    )
}
