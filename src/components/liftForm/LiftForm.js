import React from 'react'
import './LiftForm.css'

export default function LiftForm({ workout, setWorkout }) {


  function handleInputChange(e) {
    e.preventDefault();
    const { name, value } = e.target
    setWorkout({
      ...workout,
      [name]: value
    })
    console.log(value)
  }

  return (
    <div>LiftForm
      <br/>
      {/* 
      needs a 1RM <-- maybe this goes on the app

      inputs
      excersise
      weight
      reps
      note- maybe
      */}

      <label>workout: </label>
      <input
        type='text'
        name='name'
        value={workout.name}
        onChange={handleInputChange}
      />
      {/* this could be select instead of input */}

      <label>weight: </label>
      <input
        type='number' 
        name='weight'
        value={workout.weight}
        onChange={handleInputChange}
      />

      <label>reps: </label>
      <input
        type='number' 
        name='reps'
        value={workout.reps}
        onChange={handleInputChange}
      />
    </div>
  )
}
