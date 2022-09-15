import React from 'react'
import './HistoryExerciseSelect.css'


export default function HistoryExerciseSelect({ name, exercise_id, setSelectExerciseId }) {

    function handleExerciseClick() {
        setSelectExerciseId(exercise_id)
    }


    return (

        <div className='history-type-card' onClick={handleExerciseClick}>
            {name}
        </div>

    )
}
