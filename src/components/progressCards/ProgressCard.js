import React from 'react'
import './ProgressCard.css'

export default function ProgressCard({ allPrs, index }) {

  return (
    <div className='progress-card-root'>
      <div className='progress-card'>
        <div className='name-date-wrapper'>
          <div className='name'>{JSON.stringify(allPrs[index].name).replace(/\"/g, "")}</div>
          <div className='date'>{JSON.stringify(allPrs[index].date).replace(/\"/g, "")}</div>
        </div>
        <div className='max-weight'>{JSON.stringify(allPrs[index].max_weight)}&nbsp;lb</div>
      </div>
    </div>
  )
}
