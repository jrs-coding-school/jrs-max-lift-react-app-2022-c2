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
        <Modal title="Edit Lift History"
          closeModal={toggleIsModalOpen} >

          <div>
            <label>Weight:
              <input type="text" placeholder='edit weight' />
            </label>

            <br></br>

            <label>Reps:
              <input type="text" placeholder='edit reps' />
            </label>
          </div>

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
