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
  const authStatus: boolean = useAppSelector(
    (state: { jwtBoolean: { value: any } }) => state.jwtBoolean.value
  );

  //gets the previous entered email and password from localstorage and attempts to log back in with that info.
  const AutoLogin = async () => {
    const email = localStorage.getItem('enteredEmail');
    const password = localStorage.getItem('enteredPassword');

    console.log(email, password);

    try {
      if (email !== (null || undefined)) {
        const body = { email, password };
        console.log(body)

        const response = await fetch('/auth/login', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        const parseRes = await response.json();
        console.log(parseRes);

        if (parseRes.LoggedIn) {
          console.log('good!');
          localStorage.setItem('enteredEmail', email!);
          localStorage.setItem('enteredPassword', password!);
          dispatch(stateTrue());
          // setAuth(true);
          // toast.success("Logged in Successfully");
        } 
      }
    } catch (error) {
      dispatch(stateFalse());
      // setAuth(false);
      // toast.error(parseRes);
      console.error('Exception ' + error);
    }
  };

  React.useEffect(() => {
    AutoLogin();
  }, []);

  return (
    <>
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
