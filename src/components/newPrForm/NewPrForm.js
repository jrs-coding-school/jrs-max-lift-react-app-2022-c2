import React, { useContext, useState } from 'react'
import EXERCISE_DATA from '../../assets/exerciseNames.json'
import { UserContext } from '../../App'
import http from '../../services/http.service'


export default function NewPrForm() {

    const { activeUser } = useContext(UserContext)

    let today = new Date();

    // This function takes a date object and converts it to a string in the format 'yyyy-mm-dd'
    // with leading zeros when needed
    function formatDate(date) {

        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        return [year, month, day].join('-');
    }

    const [formData, setFormData] = useState({
        exerciseId: "",
        maxWeight: "",
    });

    let userId = activeUser.id
    let date = formatDate(today)

    function handleFormSubmit(e) {

        e.preventDefault();

        http.postNewPr(userId, formData.exerciseId, formData.maxWeight, date)
            .then((response) => {
                // setFormData(response.data);
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
            })
    }

    function handleInputChange(e) {

        const { name, value } = e.target;

        if (name == 'maxWeight') {
            setFormData({
                ...formData,
                [name]: Number(value)
            })
        } else {
            setFormData({
                ...formData,
                [name]: value
            })
        }
    }


    return (
        <form onSubmit={handleFormSubmit}>
            <div className='label-input-group'>

                <label>Exercise: </label>
                <select
                    autoFocus
                    className='input-group'
                    value={formData.exerciseId}
                    name="exerciseId"
                    onChange={handleInputChange}
                >
                    <option
                        value=""
                        disabled
                    >
                        select exercise
                    </option>

                    {EXERCISE_DATA.map(exercise => (
                        <option
                            key={exercise.id}
                            value={exercise.id}
                        >
                            {exercise.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className='label-input-group'>

                <label>Weight: </label>
                <input className='input-group'
                    type='number'
                    name='maxWeight'
                    value={formData.maxWeight}
                    onChange={handleInputChange}
                />
            </div>

            <button type='submit' className='primary'>Submit</button>
        </form>
    )
}
