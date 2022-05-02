import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { useAppSelector } from './app/hooks';

import Header from './components/header';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import Search from './pages/dashboard-pages/search';
import Translate from './pages/dashboard-pages/translate';
import Spinner from './pages/dashboard-components/spinner';

const App: React.FC = () => {
  const authStatus: boolean = useAppSelector(
    (state: { authBoolean: { value: any } }) => state.authBoolean.value
  );

  //navigate to login page if not logged in previous session
  React.useEffect(() => {
    if (authStatus) {
      <Navigate to="/login" replace />;

      // return;
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Spinner />
        {/* <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Search />} />
            <Route path="search" element={<Search />} />
            <Route path="translate" element={<Translate />} />
            <Route path="*" element={<Search />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Login />} />
        </Routes> */}
      </BrowserRouter>
    </>
  );
};

export default App;
