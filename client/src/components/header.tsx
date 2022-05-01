import React from 'react';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Link, Navigate } from 'react-router-dom';
import { stateFalse } from '../features/auth/authSlice';
import { enUrlsState } from '../features/enUrl/enUrlsSlice';
import { nonEnUrlsState } from '../features/nonEnUrl/nonEnUrlsSlice';

const Header: React.FC = () => {
  //redux stuff
  const dispatch = useAppDispatch();
  const authStatus: boolean = useAppSelector(
    (state: { authBoolean: { value: any } }) => state.authBoolean.value
  );

  //DONT NEED THIS FOR REDUX RESETTING STATE??
  // const reduxResultsEn = useAppSelector((state) => state.enUrlsArray.value);
  // const reduxResultsNonEn = useAppSelector(
  //   (state) => state.nonEnUrlsArray.value
  // );

  //gives the user a friendly hello
  const [name, setName] = React.useState('Stevie Wonder');

  //remove localstorage, redux state on logout. nav to login.
  const ClickedLogout = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    localStorage.removeItem('enteredEmail');
    localStorage.removeItem('enteredPassword');
    localStorage.removeItem('LoggedInOrNot');

    dispatch(enUrlsState([]));
    dispatch(nonEnUrlsState([]));
    dispatch(stateFalse());

    <Navigate to="/login" replace />;
  };

  //get the user's name to send to header via usestate var.
  React.useEffect(() => {
    const usersName: string | null = localStorage.getItem('name');

    if (typeof usersName === 'string') {
      setName(usersName);
    }
  }, [authStatus === true]);

  return (
    <div className="header">
      {authStatus ? (
        <>
          <h1 style={{ textTransform: 'capitalize' }}>Welcome, {name}</h1>
          <div></div>
          <a onClick={(e) => ClickedLogout(e)}>Logout</a>
        </>
      ) : (
        <>
          <div></div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
};

export default Header;
