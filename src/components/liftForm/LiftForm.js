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
    <div>
      <br />
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
      {/* remove the workout text box and add functionality to exercise drop down menu */}

      <div>
        <label>exercise: </label>
        <select>
          <option value="benchPress">Bench Press</option>
          <option value="inclineBenchPress">Incline Bench Press</option>
          <option value="dbPress">DB Press</option>
          <option value="bbOverheadPress">BB Over Head Press</option>
          <option value="dbOverheadPress">DB Over Head Press</option>
          <option value="seatedDbOverheadPress">Seated DB Overhead Press</option>
          <option value="pushPress">Push Press</option>
          <option value="jerk">Jerk</option>
          <option value="backSquat">Back Squat</option>
          <option value="frontSquat">Front Squat</option>
          <option value="bulgarianSplitSquat">Bulgarian Split Squat</option>
          <option value="deadlift">Deadlift</option>
          <option value="romanianDeadlift">Romanian Deadlift</option>
          <option value="powerClean">Power Clean</option>
          <option value="clean">Clean</option>
          <option value="powerSnatdh">Power Snatch</option>
          <option value="snatch">Snatch</option>
          <option value="pullup">Pull-up</option>
          <option value="pushup">Push-up</option>
        </select>

      </div>

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
