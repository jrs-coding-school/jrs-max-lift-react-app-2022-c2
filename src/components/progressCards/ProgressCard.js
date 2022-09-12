import React from 'react'
import './ProgressCard.css'

export default function ProgressCard({ allPrs, index }) {

  return (
    <div className='progress-card-root'>
      <div className='progress-card'>
        <div className='name-date-wrapper'>
          <div className='name'>{JSON.stringify(allPrs[index].name)}</div>
          <div className='date'>{JSON.stringify(allPrs[index].date)}</div>
        </div>
        <div className='max-weight'>{JSON.stringify(allPrs[index].max_weight)} lb</div>
      </div>
    </div>
  )
}
