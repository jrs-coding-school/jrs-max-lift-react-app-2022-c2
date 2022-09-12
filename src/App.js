import { createContext } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav/Nav';
import { useLocalStorage } from './hooks/useLocalStorage';

export const UserContext = createContext(null);

function App() {

  const [activeUser, setUser, unsetUser] = useLocalStorage('activeUser', {
    // id: '',
    username: '',
    password: '',
    height: 0, // inches
    weight: 0, // weight
    age: 0, // years
    sex: '' // 'm' / 'f'
  });

  function login(newUser) {
    console.log('new user', newUser)
    setUser(newUser);
  }

  function logout() {
    unsetUser();
  }

  return (

    <UserContext.Provider value={{ activeUser, login, logout }}>
      <div className="App">
        <Nav logout={logout} />

        <Outlet />
      </div>
    </UserContext.Provider>
  );
}

export default App;
