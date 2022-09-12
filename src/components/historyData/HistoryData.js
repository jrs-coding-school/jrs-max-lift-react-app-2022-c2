import React, { useEffect, useState } from 'react'
import { useBoolean } from '../../hooks/useBoolean'
import http from '../../services/http.service'

import HistoryCard from '../historyCard/HistoryCard'
import Modal from '../Modal/Modal'
import './HistoryData.css'



export default function HistoryData({ workout, typeOfHistory }) {

  const [isModalOpen, toggleIsModalOpen] = useBoolean(false)
  const [userHistory, setUserHistory] = useState('')

  let userId = 'a66a7494-29ff-11ed-bd1e-c93bcd52340c';
  // needs to be based on  which user is logged in

  let exerciseId = 1;

  useEffect(() => {
    changeHistoryType();
  }, [typeOfHistory])


  function handleSubmit() {
    // do something and then
    toggleIsModalOpen(); // close after 
  }

  function changeHistoryType() {
    if (typeOfHistory == 'full') {
      http.getUsersFullHistory(userId)
        .then((response) => {
          setUserHistory(response.data)
          // console.log(userHistory)
        })
    } else if (typeOfHistory == 'prs') {
      http.getAllPrs(userId)
        .then((response) => {
          setUserHistory(response.data)
          // console.log(userHistory)
        })
    } else if (typeOfHistory == 'prExercise') {
      http.getPrForOneExercise(userId, exerciseId)
        .then((response) => {
          setUserHistory(response.data)
          // console.log(userHistory)
        })
    } else if (typeOfHistory == 'exercise') {
      http.getExerciseHistory(userId, exerciseId)
        .then((response) => {
          setUserHistory(response.data)
          // console.log(userHistory)
        })
    }
  }


  return (
    <div>

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
          <div>
            <button className='button-secondary' onClick={toggleIsModalOpen}>
              Close
            </button>
            <button className='button-secondary' onClick={handleSubmit}>
              Save Changes
            </button>
          </div>

        </Modal>
      )}

      {/* {userHistory?.map((e, i) => { <p>hello world</p> })} */}

      <button onClick={toggleIsModalOpen}>Edit</button>

      <br></br>


      <HistoryCard userHistory={userHistory} />

    </div >
  )
}
