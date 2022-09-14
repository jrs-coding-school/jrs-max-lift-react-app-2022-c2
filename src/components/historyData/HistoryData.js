import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import { useBoolean } from '../../hooks/useBoolean'
import { useFetch } from '../../hooks/useFetch'
import http from '../../services/http.service'
import HistoryCard from '../historyCard/HistoryCard'
import HistoryExerciseSelect from '../historyType/HistoryExerciseSelect'
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
    toggleIsModalOpen();
  }

  // TODO: fix the bug where the data doesn't load unless typeOfHistory is update
  // Then delete this block of code
  function changeHistoryType() {
    if (typeOfHistory == 'full') {
      http.getUsersFullHistory(userId)
        .then((response) => {
          setUserHistory(response.data)
        })
    } else if (typeOfHistory == 'prs') {
      http.getAllPrs(userId)
        .then((response) => {
          setUserHistory(response.data)
        })
    } else if (typeOfHistory == 'prExercise') {
      http.getPrForOneExercise(userId, selectExerciseId)
        .then((response) => {
          setUserHistory(response.data)
        })
    } else if (typeOfHistory == 'exercise') {
      http.getExerciseHistory(userId, selectExerciseId)
        .then((response) => {
          setUserHistory(response.data)
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

            <label>Date:
              <input type="text" placeholder='yyyy-mm-dd' />
            </label>
          </div>

          <div>
            <button
              className='button-secondary'
              onClick={toggleIsModalOpen}
            >
              Close
            </button>

            <button
              className='button-secondary'
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </Modal>
      )}

      {allPrs.map((Pr, index) => (
        <HistoryExerciseSelect
          setSelectExerciseId={setSelectExerciseId}
          key={Pr?.id}
          index={index}
          allPrs={allPrs}
        />
      ))}

      {userHistory && (
        userHistory.map((w, index) =>
          <HistoryCard
            toggleIsModalOpen={toggleIsModalOpen}
            key={w.id}
            index={index}
            userHistory={userHistory}
          />
        ))}
    </div >
  )
}
