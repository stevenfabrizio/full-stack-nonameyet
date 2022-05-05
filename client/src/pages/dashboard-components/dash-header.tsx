import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { useAppDispatch } from '../../app/hooks';
import { stateTranslatingFalse } from '../../features/translate/translatingSlice';

const DashHeader: React.FC = () => {
  const currentLocation = useLocation().pathname;

  const dispatch = useAppDispatch();

  return (
    <>
      <div className="dash-header">
        <div></div>

        {currentLocation === '/search' ? (
          <>
            <NavLink
              onClick={() => dispatch(stateTranslatingFalse())}
              style={{ textDecoration: 'underline 2px solid rgb(6, 69, 173)' }}
              to="/search"
            >
              Search
            </NavLink>

            <NavLink to="/translate">Translated</NavLink>
          </>
        ) : (
          <></>
        )}

        {currentLocation === '/translate' ? (
          <>
            <NavLink
              onClick={() => dispatch(stateTranslatingFalse())}
              to="/search"
            >
              Search
            </NavLink>

            <NavLink
              to="/translate"
              style={{ textDecoration: 'underline 2px solid rgb(6, 69, 173)'}}
            >
              Translated
            </NavLink>
          </>
        ) : (
          <></>
        )}

        <div></div>
      </div>
    </>
  );
};

export default DashHeader;
