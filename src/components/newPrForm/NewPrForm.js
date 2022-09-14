import React, { useContext, useState } from 'react'
import EXERCISE_DATA from '../../assets/exerciseNames.json'
import { UserContext } from '../../App'
import http from '../../services/http.service'


export default function NewPrForm() {

    const { activeUser } = useContext(UserContext)
    // const login = useContext(VerifyUser);

    let today = new (Date)

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
        userId: activeUser.id,
        exerciseId: "0",
        max_weight: 0,
        date: formatDate(today)
    });

    function handleFormSubmit(e) {

        e.preventDefault();

        http.postNewPr(formData)
            .then((response) => {
                setFormData(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    function handleInputChange(e) {

        const { name, value } = e.target;

        if (name == 'max_weight') {
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

    const input = document.querySelector('input');

    function handleTextInputClick(e) {
        input.select();
    }


    return (
        <form onSubmit={handleFormSubmit}>
            <div className='label-input-group'>

                <label>Exercise: </label>
                <select className='input-group'
                    value={EXERCISE_DATA.id}
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
                    name='max_weight'
                    value={formData.max_weight}
                    onChange={handleInputChange}
                    onClick={handleTextInputClick}
                />
            </div>

            <button type='submit' className='primary'>Submit</button>
        </form>
    )
}
