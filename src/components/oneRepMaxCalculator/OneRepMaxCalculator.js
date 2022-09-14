import React, { useState } from 'react'
import EXERCISE_DATA from '../../assets/exerciseNames.json'

export default function OneRepMaxCalculator() {

    const [workout, setWorkout] = useState({
        id: '',
        name: '',
        weight: 0,
        reps: 0,
    })

    var oneRepMax = Math.floor(workout.weight * Math.pow(workout.reps, 0.1))

    function handleInputChange(e) {

        const { name, value } = e.target
        setWorkout({
            ...workout,
            [name]: value
        })
    }

    const inputWeight = document.querySelector('input[name="weight"]');
    function handleWeightInputClick(e) {
        inputWeight.select();
    }

    const inputReps = document.querySelector('input[name="reps"]');
    function handleRepsInputClick(e) {
        inputReps.select();
    }


    return (
        <div className='lift-form inputs-container'>
            {/* 
        needs a 1RM <-- maybe this goes on the app
        */}

            {/* remove the exercise text box and add functionality to exercise drop down menu */}
            {/* make sure that {handleInputChange} is applied to below correctly */}
            <div className='label-input-group'>
                <label>Exercise: </label>
                <select className='input-group'
                    value={
                        workout.id
                            ? JSON.stringify({
                                id: workout.id,
                                name: workout.name
                            })
                            : ""
                    }
                    onChange={(e) => {
                        let { value } = e.target
                        value = JSON.parse(value);
                        setWorkout({
                            ...workout,
                            id: value.id,
                            name: value.name
                        })
                    }}>

                    <option
                        value=""
                        disabled
                    >
                        select exercise
                    </option>

                    {EXERCISE_DATA.map(exercise => (
                        <option
                            key={exercise.id}
                            value={JSON.stringify(exercise)}
                        >
                            {exercise.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className='label-input-group'>
                <label>Weight: </label>
                <input className='input-group'
                    type='number'
                    name='weight'
                    value={workout.weight}
                    onChange={handleInputChange}
                    onClick={handleWeightInputClick}
                />
            </div>

            <div className='label-input-group'>
                <label>Reps: </label>
                <input className='input-group'
                    type='number'
                    name='reps'
                    value={workout.reps}
                    onChange={handleInputChange}
                    onClick={handleRepsInputClick}
                />
            </div>

            <h3 className='calculate' >{workout.name} 1RM: {oneRepMax} lbs</h3>

        </div>
    )
}