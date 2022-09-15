import React from 'react'
import './HistoryExerciseSelect.css'


export default function HistoryExerciseSelect({ name, exercise_id, setSelectExerciseId, selectExerciseId }) {

    function handleExerciseClick() {
        setSelectExerciseId(exercise_id)
    }


    return (

        <div
            className={'history-type-card ' + (selectExerciseId == exercise_id && 'selected')}
            onClick={handleExerciseClick}
        >
            {name}
        </div>

    )
}
