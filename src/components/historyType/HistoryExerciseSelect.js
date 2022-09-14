import React from 'react'
import './HistoryExerciseSelect.css'


export default function HistoryExerciseSelect({ allPrs, index, setSelectExerciseId }) {

    function handleExerciseClick() {
        console.log(allPrs[index]?.exercise_id)
        setSelectExerciseId(allPrs[index]?.exercise_id)
    }


    return (
        <div className='history-type-root'>
            <div className='history-type-card' onClick={handleExerciseClick}>
                {JSON.stringify(allPrs[index]?.name).replace(/\"/g, "")}
            </div>
        </div>
    )
}
