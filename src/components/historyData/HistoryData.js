import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import { useFetch } from '../../hooks/useFetch'
import http from '../../services/http.service'
import HistoryCard from '../historyCard/HistoryCard'
import HistoryExerciseSelect from '../historyType/HistoryExerciseSelect'
import './HistoryData.css'


export default function HistoryData({ typeOfHistory, selectExerciseId, setSelectExerciseId }) {

  const { activeUser } = useContext(UserContext)
  const [userHistory, setUserHistory] = useState('')
  const [allPrs, reloadAllPrs] = useFetch(http.getAllPrs, activeUser?.id, [])

  let userId = activeUser?.id;

  useEffect(() => {
    changeHistoryType();
  }, [typeOfHistory])


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
    <div className='exercise-history'>

      {allPrs.map((pr, index) => (
        <HistoryExerciseSelect
          setSelectExerciseId={setSelectExerciseId}
          key={pr?.id}
          {...pr}
        />
      ))}

      {userHistory && (
        userHistory.map((w, index) =>
          <HistoryCard
            key={w.id}
            {...w}
          />
        ))}
    </div >
  )
}
