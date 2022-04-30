import React from 'react';

import { NavLink } from 'react-router-dom';

const DashHeader: React.FC = () => {
  return (
    <>
      <div className="dash-header">
        <div></div>
        <NavLink to="/search">Search</NavLink>
        <NavLink to="/translate">Translate</NavLink>
        <div></div>
      </div>
    </>
  );
};

export default DashHeader;
