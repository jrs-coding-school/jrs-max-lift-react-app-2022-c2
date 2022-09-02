import React, { useState } from 'react'
import { useBoolean } from '../../hooks/useBoolean'
import EditWorkoutModal from '../editWorkoutModal/EditWorkoutModal'
import Modal from '../Modal/Modal'
import './HistoryData.css'



export default function HistoryData() {

  const [isModalOpen, toggleIsModalOpen] = useBoolean(false)

  function handleSubmit() {
    // do something and then
    toggleIsModalOpen(); // close after 
  }


  return (
    <div>
      HistoryData
      {/* 
      this is a table of the users excercise history
      shown in the history page based on which workout is selected or 
      maybe do accordions
      */}

      {isModalOpen && (
        <Modal title="Edit Workout History"
          closeModal={toggleIsModalOpen} >

          <div>Hi, i'm in the modal now</div>

          <button onClick={toggleIsModalOpen}>
            Close
          </button>
          <button onClick={handleSubmit}>
            Save Changes
          </button>

        </Modal>
      )}
      <button onClick={toggleIsModalOpen}>Edit</button>

    </div >
  )
}
