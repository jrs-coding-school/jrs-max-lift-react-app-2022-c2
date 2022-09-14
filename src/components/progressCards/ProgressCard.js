import React from 'react'
import './ProgressCard.css'


export default function ProgressCard({ name, date, maxWeight }) {


  return (
    <div className='progress-card-root'>
      <div className='progress-card'>
        <div className='name-date-wrapper'>
          <div className='name'>{name}</div>

          <div className='date'>{date}</div>
        </div>

        <div className='max-weight'>{maxWeight}&nbsp;lb</div>
      </div>
    </div>
  )
}
