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

        http.deletePr(id)
            .then(toggleIsModalOpen)
            .then(console.log('test'))

        window.location.reload();
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

                    <button onClick={toggleIsModalOpen}>Delete</button>
                </div>
            </div>
            {isModalOpen && (
                <Modal title="Are you sure you want to delete this?"
                    closeModal={toggleIsModalOpen} >
                    <form onSubmit={handleFormSubmit}>

                        {/* inputs */}
                        {/* <div>
                            <label>Weight:
                                <input type="text"
                                    value={weightInput}
                                    onChange={(e) => {
                                        setWeightInput(e.target.value)
                                    }}
                                    placeholder='edit weight' />
                            </label>

                        </div> */}
                        {/* buttons */}
                        <div>
                            <button
                                type='button'
                                className='button-secondary'
                                onClick={toggleIsModalOpen}
                            >
                                Close
                            </button>

                            <button
                                type='submit'
                                className='button-secondary'
                            >
                                Delete
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    )
}
