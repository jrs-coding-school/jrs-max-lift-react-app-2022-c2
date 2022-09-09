import React from 'react'
import './HistoryCard.css'

export default function HistoryCard({ userHistory }) {
    return (
        <div>
            {JSON.stringify(userHistory)}
        </div>
    )
}
