import React, { useContext, useEffect, useState } from 'react'
import HistoryData from '../historyData/HistoryData'
import './HistoryPage.css'
import http from '../../services/http.service'
import { useFetch } from '../../hooks/useFetch'
import LineChart from '../Charts/LineChart'
import { UserContext } from '../../App'
import { useNavigate } from 'react-router-dom'


export default function HistoryPage() {

  const { activeUser } = useContext(UserContext)
  const [selectExerciseId, setSelectExerciseId] = useState(null)
  const [fullHistory, reloadFullHistory] = useFetch(http.getUsersFullHistory, activeUser?.id, []);
  const navigate = useNavigate();


  return (
    <div className='history-page-root'>

      <h1>Your History</h1>

      {fullHistory.length != 0 && <LineChart datasetValues={fullHistory} />}

      {fullHistory.length == 0
        && <div
          onClick={() => { navigate('/progress') }}
          className='navigate'
        >
          You dont have any previous history. Click here to get started.
        </div>
      }

      <HistoryData
        selectExerciseId={selectExerciseId}
        setSelectExerciseId={setSelectExerciseId}
      />
    </div>
  )
}
