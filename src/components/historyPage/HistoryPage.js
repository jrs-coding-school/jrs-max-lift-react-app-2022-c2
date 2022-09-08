import React from 'react'
import ChartData from '../chartData/ChartData'
import HistoryData from '../historyData/HistoryData'
import './HistoryPage.css'
import http from '../../services/http.service'
import { useFetch } from '../../hooks/useFetch'

export default function HistoryPage() {

  let user_id;
  let exercise_id;



  const [workout, reloadWorkout] = useFetch(http.getExerciseHistory(user_id, exercise_id));

  return (
    <div>
      HistoryPage
      <HistoryData workout={workout} />
      <ChartData />
    </div>
  )
}
