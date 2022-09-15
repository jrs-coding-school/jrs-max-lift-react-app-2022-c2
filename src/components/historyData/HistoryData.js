import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import { useFetch } from '../../hooks/useFetch'
import http from '../../services/http.service'
import HistoryCard from '../historyCard/HistoryCard'
import HistoryExerciseSelect from '../historyType/HistoryExerciseSelect'
import './HistoryData.css'


export default function HistoryData({ selectExerciseId, setSelectExerciseId }) {

  const { activeUser } = useContext(UserContext)
  const [userHistory, setUserHistory] = useState('')
  const [allPrs, reloadAllPrs] = useFetch(http.getAllPrs, activeUser?.id, [])

  let userId = activeUser?.id;

  useEffect(() => {
    // changeHistoryType();
    http.getExerciseHistory(userId, selectExerciseId)
      .then((response) => {
        setUserHistory(response.data)
      })
  }, [selectExerciseId])


  return (
    <div className='exercise-history'>

      {allPrs.map((pr, index) => (
        <HistoryExerciseSelect
          setSelectExerciseId={setSelectExerciseId}
          key={pr?.id}
          selectExerciseId={selectExerciseId}
          {...pr}
        />
      ))}

      <div className='break'></div>

      <div className='exercise-history'>

        {userHistory && (
          userHistory.map((w, index) =>
            <HistoryCard
              key={w.id}
              {...w}
            />
          ))}
      </div>
    </div >
  )
}
