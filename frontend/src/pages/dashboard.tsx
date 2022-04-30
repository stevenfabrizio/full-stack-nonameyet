import React from 'react';

import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

import DashHeader from './dashboard-components/dash-header';

const Dashboard: React.FC = () => {
  //redux variables here.
  const authStatus: boolean = useAppSelector(
    (state: { authBoolean: { value: any } }) => state.authBoolean.value
  );

  const navigate = useNavigate();

  //if we get here accidently, leave if shouldnt be here.
  React.useEffect(() => {
    // if (!authStatus) {
    //   navigate('/login');
    // } else {
    //   navigate('/search');
    // }
    !authStatus ? navigate('/login') : navigate('/search');
  }, [authStatus === false]);

  return (
    <>
      <div className="dashboard-container">
        <DashHeader />
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
