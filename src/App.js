import './App.css';
import LiftForm from './components/liftForm/LiftForm';
import Nav from './components/Nav/Nav';

function App() {
  return (
    <div className="App">
      App
      {/* 
      nav
      title
      carousel
      one rep max calculation?
      <LiftForm />
      save and cancel button? ADDED - 9/1/22
      */}
      <Nav />
      <h1>Title</h1>
      <LiftForm />
      <button>cancel</button>
      <button>save</button>
    </div>
  );
}

export default App;
