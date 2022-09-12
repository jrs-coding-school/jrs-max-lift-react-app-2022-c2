import React from 'react'
import './ProgressCard.css'

export default function ProgressCard({ allPrs, index }) {

  return (
    <div>
      <div className='card'>
        <div>{JSON.stringify(allPrs[index].name)}</div>
        <div>{JSON.stringify(allPrs[index].date)}</div>
        <div>{JSON.stringify(allPrs[index].max_weight)} lb</div>
      </div>
    </div>
  )
}
