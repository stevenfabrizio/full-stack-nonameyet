import React from 'react';

import { useAppDispatch } from '../app/hooks';
import { stateFalse } from '../features/jwt/jwtSlice';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  // const GetProfile
  const Logout = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {
      localStorage.removeItem('enteredEmail');
      localStorage.removeItem('enteredPassword');

      dispatch(stateFalse());

      // setAuth(false)
      // toast success 'logged out successfully'
    } catch (error) {
      console.error('Exception ' + error);
    }
  };
  return (
    <>
      <h1>Dashboard</h1>
      <h2>Welcome, namee</h2>
      <button onClick={(e) => Logout(e)}>Logout</button>
    </>
  );
};

export default Dashboard;
