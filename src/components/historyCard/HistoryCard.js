import React, { useState } from 'react'
import { useBoolean } from '../../hooks/useBoolean'
import Modal from '../Modal/Modal'
import './HistoryCard.css'
import http from '../../services/http.service'

export default function HistoryCard({ name, date, id, maxWeight }) {

    const [isModalOpen, toggleIsModalOpen] = useBoolean(false)
    const [weightInput, setWeightInput] = useState(maxWeight)

    function handleFormSubmit(e) {
        e.preventDefault()
        // http update item
        http.updateOrm(id, weightInput)
            .then(setWeightInput(maxWeight))
            .then(toggleIsModalOpen)
        //  .then -> maybe update state?
    }
    return (
        <>
            <div>
                <div className='progress-card-root'>
                    <div className='progress-card'>
                        <div className='name-date-wrapper'>
                            <div className='name'>{name}</div>

                            <div className='date'>{date}</div>
                        </div>
                        <div className='max-weight'>{maxWeight}&nbsp;lb</div>
                    </div>

                    <button onClick={toggleIsModalOpen}>Edit</button>
                </div>
            </div>
            {isModalOpen && (
                <Modal title="Edit Lift History"
                    closeModal={toggleIsModalOpen} >
                    <form onSubmit={handleFormSubmit}>

                        {/* inputs */}
                        <div>
                            <label>Weight:
                                <input type="text"
                                    value={weightInput}
                                    onChange={(e) => {
                                        setWeightInput(e.target.value)
                                    }}
                                    placeholder='edit weight' />
                            </label>

                        </div>
                        {/* buttons */}
                        <div>
                            <button
                                className='button-secondary'
                                onClick={toggleIsModalOpen}
                            >
                                Close
                            </button>

                            <button
                                className='button-secondary'
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    )
}
