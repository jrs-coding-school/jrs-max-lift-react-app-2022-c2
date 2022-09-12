import React, { useContext, useState } from 'react'
import { UserContext } from '../../App'
import { useFetch } from '../../hooks/useFetch'
import ProgressCard from '../progressCards/ProgressCard'
import http from '../../services/http.service'
import './ProgressPage.css'
import NewPrForm from '../newPrForm/NewPrForm'

export default function ProgressPage() {

  const { activeUser } = useContext(UserContext)
  const [isNewPrOpen, setIsNewPrOpen] = useState(false)

  const [allPrs, reloadAllPrs] = useFetch(http.getAllPrs, activeUser?.id, [])
  // const [allPrsForExercise, reloadAllPrsForExercise] = useFetch(http.getPrForOneExercise, activeUser?.id, [])


  return (
    <div>
      <button type='button' onClick={() => { setIsNewPrOpen(!isNewPrOpen) }}>
        {isNewPrOpen
          ? "Close Form"
          : "Add new PR"
        }
      </button>
      {isNewPrOpen && <NewPrForm />}
      <h2>Current Personal Records</h2>
      {allPrs.map((Pr, i) => <ProgressCard allPrs={allPrs} key={Pr?.id} index={i} />)}
    </div>
  )
}
