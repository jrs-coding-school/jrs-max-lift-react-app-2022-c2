import React from 'react'
import Nav from '../Nav/Nav'
import ProgressCard from '../progressCards/ProgressCard'
import './ProgressPage.css'

export default function ProgressPage() {
  return (
    <div>ProgressPage
      {/* 
       progress cards
      */}
      <Nav/>
      <ProgressCard/>
    </div>
  )
}
