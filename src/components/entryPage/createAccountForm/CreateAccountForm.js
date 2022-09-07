import React from 'react'
import './CreateAccountForm.css'

export default function CreateAccountForm({ user, setUser }) {

  let totalHeight;

  function handleEntryFormChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }

  function handleheightChange(e) {
    e.preventDefault();
    const { name, value } = e.target;

    // if (name == 'heightFeet') {
    //   totalHeight = value * 12 + user.heightInches;
    // } else if (name == 'heightInches') {
    //   totalHeight = user.heightFeet * 12 + value;
    // }

    setUser({
      ...user,
      [name]: value,
    })

    totalHeight = user.heightFeet * 12 + user.heightInches;

    // setUser({
    //   ...user,
    //   height: totalHeight
    // })

    console.log(user.height)
  }

  return (
    <div className='create_account'>
      <h4>Create New Account</h4>

      <label>Username: </label>
      <input
        type='text'
        name='username'
        value={user.username}
        onChange={handleEntryFormChange}
      />

      <label>Password: </label>
      <input
        type='password'
        name='password'
        value={user.password}
        onChange={handleEntryFormChange}
      />

      <label>Confirm Password: </label>
      <input
        type='password'
        name='password'
        value={user.password}
        onChange={handleEntryFormChange}
      />
      {/* THIS NEEDS WORK */}


      <label>Height: </label>
      <input
        type='number'
        name='heightFeet'
        value={user.heightFeet}
        onChange={handleheightChange}
      />
      <input
        type='number'
        name='heightInches'
        value={user.heightInches}
        onChange={handleheightChange}
      />


      <label>Weight: </label>
      <input
        type='number'
        name='weight'
        value={user.weight}
        onChange={handleEntryFormChange}
      />

      <label>Age: </label>
      <input
        type='number'
        name='age'
        value={user.age}
        onChange={handleEntryFormChange}
      />

      <label>Gender: </label>
      <select
        type='text'
        name='gender'
        value={user.gender}
        onChange={handleEntryFormChange}
      >
        <option value="" disabled>Gender</option>
        <option value="m">Male</option>
        <option value="f">Female</option>

      </select>
    </div>
  )
}
