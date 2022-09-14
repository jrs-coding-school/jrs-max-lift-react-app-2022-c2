import React from 'react';
import { useState } from 'react';
import LiftForm from '../liftForm/LiftForm';
import OneRepMaxCalculator from '../oneRepMaxCalculator/OneRepMaxCalculator';
import './HomePage.css';


export default function HomePage() {

    const [workout, setWorkout] = useState({
        id: '',
        name: '',
        weight: 0,
        reps: 0,
    })

    var oneRepMax = Math.floor(workout.weight * Math.pow(workout.reps, 0.1))


    return (
        <div>
            <OneRepMaxCalculator />
        </div>
    )
}
