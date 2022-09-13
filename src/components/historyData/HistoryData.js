import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import { useBoolean } from '../../hooks/useBoolean'
import { useFetch } from '../../hooks/useFetch'
import http from '../../services/http.service'

import HistoryCard from '../historyCard/HistoryCard'
import HistoryType from '../historyType/HistoryType'
import Modal from '../Modal/Modal'
import './HistoryData.css'



export default function HistoryData({ typeOfHistory, selectExerciseId, setSelectExerciseId }) {

  const { activeUser } = useContext(UserContext)
  const [isModalOpen, toggleIsModalOpen] = useBoolean(false)
  const [userHistory, setUserHistory] = useState('')
  const [allPrs, reloadAllPrs] = useFetch(http.getAllPrs, activeUser?.id, [])

  let userId = activeUser?.id;

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
      http.getPrForOneExercise(userId, selectExerciseId)
        .then((response) => {
          setUserHistory(response.data)
          // console.log(userHistory)
        })
    } else if (typeOfHistory == 'exercise') {
      http.getExerciseHistory(userId, selectExerciseId)
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



      <br></br>

      {allPrs.map((Pr, index) => <HistoryType setSelectExerciseId={setSelectExerciseId} key={Pr?.id} index={index} allPrs={allPrs} />)}

      <HistoryCard userHistory={userHistory} />

    </div >
  )
}
