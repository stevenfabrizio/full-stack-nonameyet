import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  const AreWeAuthenticated: () => Promise<void> = async () => {
    try {
      const checkHeader = await fetch(
        'http://localhost:8000/authentication/verify',
        {
          method: 'POST',
          headers: { jwtToken: localStorage.token },
        }
      );

      const parseRes = await checkHeader.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

  React.useEffect(() => {
    AreWeAuthenticated();
  }, []);

  const setAuth = (boolean: boolean) => {
    setIsAuthenticated(boolean)
  }

  return (
    <>
      <h1>HELLO)))))0000</h1>
      <Login />
      <Register />
      <Dashboard />
    </>
  );
};

export default App;
