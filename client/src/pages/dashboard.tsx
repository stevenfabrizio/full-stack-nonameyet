import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../app/hooks';

import WikiBG from '../images/WikiBg.webp';
import DashHeader from './dashboard-components/dash-header';

const Dashboard: React.FC = () => {
  //redux variables here.
  const authStatus: boolean = useAppSelector(
    (state: { authBoolean: { value: boolean } }) => state.authBoolean.value
  );

  const navigate = useNavigate();

  //if we get here accidently, leave if shouldnt be here.
  React.useEffect(() => {
    !authStatus ? navigate('/login') : navigate('/search');
  }, [authStatus]);
  // background-image: url(./images/WikiBg.webp);
  return (
    <div
      style={{ backgroundImage: `url(${WikiBG})` }}
      className="dashboard-container"
    >
      <DashHeader />
      <Outlet />
    </div>
  );
};

export default Dashboard;
