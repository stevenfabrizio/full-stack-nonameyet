import React from 'react';
import { NavLink } from 'react-router-dom';

import { useAppDispatch } from '../../app/hooks';
import { stateTranslatingFalse } from '../../features/translate/translatingSlice';

const DashHeader: React.FC = () => {
  const dispatch = useAppDispatch();

  //set translating state to false if clicking Search.
  return (
    <>
      <div className="dash-header">
        <div></div>

        <NavLink onClick={() => dispatch(stateTranslatingFalse())} to="/search">
          Search
        </NavLink>

        <NavLink to="/translate">Translate</NavLink>

        <div></div>
      </div>
    </>
  );
};

export default DashHeader;
