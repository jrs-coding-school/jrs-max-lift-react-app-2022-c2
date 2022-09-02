import React from 'react'
import ChartData from '../chartData/ChartData'
import HistoryData from '../historyData/HistoryData'
import Nav from '../Nav/Nav'
import './HistoryPage.css'

export default function HistoryPage() {
  return (
    <div>HistoryPage
      <HistoryData />
      <ChartData />
    </div>
  )
}
