import React from 'react';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Link, Navigate } from 'react-router-dom';
import { stateFalse } from '../features/auth/authSlice';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const authStatus: boolean = useAppSelector(
    (state: { authBoolean: { value: any } }) => state.authBoolean.value
  );

  //remove localstorage, redux state on logout. nav to login.
  const ClickedLogout = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    localStorage.removeItem('enteredEmail');
    localStorage.removeItem('enteredPassword');
    localStorage.removeItem('LoggedInOrNot');

    dispatch(stateFalse());

    <Navigate to="/login" replace />;
  };

  // const ClickedLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault();

  //   <Navigate to="/login" replace />;
  // };

  // const ClickedRegister = (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   e.preventDefault();

  //   <Navigate to="/register" replace />;
  // };

  return (
    <div className="header">
      <div></div>

      {authStatus ? (
        <>
          <div></div>
          <a onClick={(e) => ClickedLogout(e)}>Logout</a>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="register">Register</Link>
        </>
      )}
    </div>
  );
};

export default Header;
