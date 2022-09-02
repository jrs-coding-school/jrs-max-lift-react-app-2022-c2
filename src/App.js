import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import LiftForm from './components/liftForm/LiftForm';
import Nav from './components/Nav/Nav';

function App() {

  const [workout, setWorkout] = useState({
    // this needs to be the table `excersises` from sql. also need more parameters
    name: 'Squat',
    weight: 0,
    reps: 0,
  })
  const [oneRepMax, setOneRepMax] = useState(0)

  function handleCalcClick(e) {
    setOneRepMax(Math.floor(workout.weight * (1 + workout.reps / 30)));
  }

  return (
    <div className="App">

      <Nav />

      <Outlet />

    </div>
  );
}

export default App;
