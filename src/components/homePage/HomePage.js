import React from 'react';
import { useState } from 'react';
import LiftForm from '../liftForm/LiftForm';
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
            <h1>1 Rep Max Calculator</h1>

            <LiftForm workout={workout} setWorkout={setWorkout} />

            <h3 className='calculate' >{workout.name} 1RM: {oneRepMax} lbs</h3>
        </div>
    )
}
