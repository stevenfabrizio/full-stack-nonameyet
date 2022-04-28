import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { stateFalse } from '../features/auth/authSlice';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus: boolean = useAppSelector(
    (state: { authBoolean: { value: any } }) => state.authBoolean.value
  );
  const [name, setName] = React.useState('');

  const Logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    localStorage.removeItem('enteredEmail');
    localStorage.removeItem('enteredPassword');
    localStorage.removeItem('LoggedInOrNot');

    dispatch(stateFalse());
    navigate('/login');
  };

  //if we get here accidently, leave if shouldnt be here.
  React.useEffect(() => {
    if (!authStatus) {
      navigate('/login');
    }

    setName(localStorage.getItem('name')!);
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <h2>Welcome, {name}</h2>
      <button onClick={(e) => Logout(e)}>Logout</button>
    </>
  );
};

export default Dashboard;
