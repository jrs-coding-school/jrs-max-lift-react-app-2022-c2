import React from 'react'
import './HistoryCard.css'

export default function HistoryCard({ userHistory, index, toggleIsModalOpen }) {
    return (
        <div>
            {/* {JSON.stringify(userHistory)} */}
            {/* <button onClick={toggleIsModalOpen}>Edit</button> */}
            <div className='progress-card-root'>
                <div className='progress-card'>
                    <div className='name-date-wrapper'>
                        <div className='name'>{JSON.stringify(userHistory[index].name).replace(/\"/g, "")}</div>
                        <div className='date'>{JSON.stringify(userHistory[index].date).replace(/\"/g, "")}</div>
                    </div>
                    <div className='max-weight'>{JSON.stringify(userHistory[index].max_weight)}&nbsp;lb</div>
                </div>
                <button onClick={toggleIsModalOpen}>Edit</button>
            </div>
        </div>
    )
}
