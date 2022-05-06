import React from 'react';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Link, Navigate } from 'react-router-dom';
import { stateFalse } from '../features/auth/authSlice';
import { enUrlsState } from '../features/enUrl/enUrlsSlice';
import { nonEnUrlsState } from '../features/nonEnUrl/nonEnUrlsSlice';
import { stateTranslatedFalse } from '../features/translate/translatedSlice';
import { stateTranslatingFalse } from '../features/translate/translatingSlice';

const Header: React.FC = () => {
  //redux stuff
  const dispatch = useAppDispatch();
  const authStatus: boolean = useAppSelector(
    (state: { authBoolean: { value: boolean } }) => state.authBoolean.value
  );
  const translatingState: boolean = useAppSelector(
    (state: { translatingBoolean: { value: boolean } }) =>
      state.translatingBoolean.value
  );
  const translatedState: boolean = useAppSelector(
    (state: { translatedBoolean: { value: boolean } }) =>
      state.translatedBoolean.value
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

    dispatch(stateTranslatingFalse());
    dispatch(stateTranslatedFalse());
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
    <div className="header-component">
      {authStatus ? (
        <>
          <h1 style={{ textTransform: 'capitalize' }}>Welcome, {name}</h1>

          <div></div>
          <a onClick={(e) => ClickedLogout(e)}>Logout</a>
        </>
      ) : (
        <>
          <h1 style={{ textTransform: 'capitalize' }}>Wikipedia Translator</h1>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
};

export default Header;
