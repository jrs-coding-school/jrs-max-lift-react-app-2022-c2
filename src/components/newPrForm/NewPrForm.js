import React, { useContext, useState } from 'react'
import EXERCISE_DATA from '../../assets/exerciseNames.json'
import { UserContext } from '../../App'
import http from '../../services/http.service'

export default function NewPrForm() {

    const { activeUser } = useContext(UserContext)
    // const login = useContext(VerifyUser);

    // useState
    const [formData, setFormData] = useState({
        userId: activeUser.id,
        exerciseId: "0",
        max_weight: 0,
        date: "2022-09-12"
    });
    console.log(formData)

    function handleFormSubmit(e) {
        e.preventDefault();

        // post a PR ????
        http.postNewPr(formData)
            .then((response) => {
                console.log(response.data);
                setFormData(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }


    function handleInputChange(e) {
        const { name, value } = e.target;

        if (name == 'max_weight') {
            console.log('yes', typeof value)
            setFormData({
                ...formData,
                [name]: Number(value)
            })
        } else {
            console.log('no', name)
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
                />
            </div>
        </form>
    )
}
