import React, { useContext, useState } from 'react'
import { UserContext } from '../../App'
import { useFetch } from '../../hooks/useFetch'
import ProgressCard from '../progressCards/ProgressCard'
import http from '../../services/http.service'
import './ProgressPage.css'
import NewPrForm from '../newPrForm/NewPrForm'
import { useBoolean } from '../../hooks/useBoolean'
import Modal from '../Modal/Modal'

export default function ProgressPage() {

  const { activeUser } = useContext(UserContext)
  const [isNewPrOpen, setIsNewPrOpen] = useState(false)
  const [isModalOpen, toggleIsModalOpen] = useBoolean(false)

  const [allPrs, reloadAllPrs] = useFetch(http.getAllPrs, activeUser?.id, [])
  // const [allPrsForExercise, reloadAllPrsForExercise] = useFetch(http.getPrForOneExercise, activeUser?.id, [])

  function handleSubmit() {
    // do something and then
    toggleIsModalOpen(); // close after 
  }

  return (
    <div className='progress-page-root'>
      <button
        type='button'
        onClick={() => { setIsNewPrOpen(!isNewPrOpen) }}
        className='primary'
      >
        {isNewPrOpen
          ? "Close Form"
          : "Add new PR"
        }
      </button>
      {isNewPrOpen && <NewPrForm />}
      <h2>Current Personal Records</h2>
      {allPrs.map((Pr, i) => <ProgressCard toggleIsModalOpen={toggleIsModalOpen} allPrs={allPrs} key={Pr?.id} index={i} />)}
      {allPrs.length === 0 ? "You don't have any PRs, add new PR to begin" : ""}

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
            <button type='button' className='button-secondary' onClick={toggleIsModalOpen}>
              Close
            </button>
            <button type='submit' className='button-secondary' onClick={handleSubmit}>
              Save Changes
            </button>
          </div>

        </Modal>
      )}
    </div>
  )
}
