import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { useAppSelector } from './app/hooks';

import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';

const App: React.FC = () => {
  //get the auth state from redux
  const authStatus: boolean = useAppSelector(
    (state: { authBoolean: { value: any } }) => state.authBoolean.value
  );

  //navigate to login page if not logged in prev session
  React.useEffect(() => {
    // console.log(authStatus);

    if (authStatus) {
      <Navigate to="/login" replace />;
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
