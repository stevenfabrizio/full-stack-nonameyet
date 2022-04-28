import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { stateFalse } from '../features/auth/authSlice';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus: boolean = useAppSelector(
    (state: { authBoolean: { value: any } }) => state.authBoolean.value
  );

  const Logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    localStorage.removeItem('enteredEmail');
    localStorage.removeItem('enteredPassword');
    localStorage.removeItem('LoggedInOrNot');

    dispatch(stateFalse());
    // <Navigate to="/login" replace />;
    navigate('/login');
  };

  //if we get here accidently, leave if shouldnt be here.
  React.useEffect(() => {
    if (!authStatus) {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <h2>Welcome, namee</h2>
      <button onClick={(e) => Logout(e)}>Logout</button>
    </>
  );
};

export default Dashboard;
