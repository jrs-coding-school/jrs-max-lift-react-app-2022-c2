import React from 'react'
import EditWorkoutModal from '../editWorkoutModal/EditWorkoutModal'
import './HistoryData.css'

export default function HistoryData() {
  return (
    <div>
      HistoryData
      {/* 
      this is a table of the users excercise history
      shown in the history page based on which workout is selected or 
      maybe do accordions
      */}
      <EditWorkoutModal />
    </div>
  )
}
