import React, { useContext, useState } from 'react'
import HistoryData from '../historyData/HistoryData'
import './HistoryPage.css'
import http from '../../services/http.service'
import { useFetch } from '../../hooks/useFetch'
import LineChart from '../Charts/LineChart'
import { UserContext } from '../../App'

export default function HistoryPage() {

  // this needs to be changed based off which user and exercise needs to be shown
  const { activeUser } = useContext(UserContext)
  let exerciseId = 1;

  const [typeOfHistory, setTypeOfHistory] = useState('full')

  const [fullHistory, reloadFullHistory] = useFetch(http.getUsersFullHistory, activeUser?.id, []);

  return (
    <div>
      {/* <div onClick={() => { setTypeOfHistory('full') }}>getUsersFullHistory</div>
      <div onClick={() => { setTypeOfHistory('prs') }}>getAllPrs</div>
      <div onClick={() => { setTypeOfHistory('prExercise') }}>getPrForOneExercise</div>
      <div onClick={() => { setTypeOfHistory('exercise') }}>getExerciseHistory</div> */}

      {/* <HistoryData workout={workout} typeOfHistory={typeOfHistory} /> */}
      {fullHistory && <LineChart datasetValues={fullHistory} />}
      {fullHistory.length == 0 && <div>You dont have any previous history click here to get started</div>}
    </div>
  )
}
