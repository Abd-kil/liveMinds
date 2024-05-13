import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import AuthContext from './context/AuthProvider';
import Login from './pages/login/Login';

function App() {
  const isLogedIn = false
  return (
    <>
    {
      isLogedIn?
      (<div className = "App" >
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
      </div>):
      <Login />
    }
    </>
  );
}

export default App;
