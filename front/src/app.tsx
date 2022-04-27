import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { useAppDispatch } from './app/hooks';
import { useAppSelector } from './app/hooks';
import { stateFalse, stateTrue } from './features/jwt/jwtSlice';

import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const authStatus: boolean = useAppSelector((state) => state.jwtBoolean.value);

  const AreWeAuthenticated = async () => {
    try {
      const checkHeader = await fetch(
        'http://localhost:8000/authentication/verify',
        {
          method: 'POST',
          headers: { jwtToken: localStorage.token },
        }
      );

      const parseRes = await checkHeader.json();

      parseRes === true ? dispatch(stateTrue()) : dispatch(stateFalse());
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

  React.useEffect(() => {
    AreWeAuthenticated();
  }, []);

  return (
    <>
      <h1>HELLO)))))0000</h1>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              !authStatus ? <Login /> : <Navigate to="/dashboard" replace />
            }
          />
          <Route
            path="/register"
            element={
              !authStatus ? <Register /> : <Navigate to="/dashboard" replace />
            }
          />
          <Route
            path="/dashboard"
            element={
              authStatus ? <Dashboard /> : <Navigate to="/login" replace />
            }
          />
          <Route index element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
