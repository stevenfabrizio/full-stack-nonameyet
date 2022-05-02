import React from 'react';
import { Gb, De, Es, Fr, It } from 'react-flags-select';

require('./spinner.css')

const Spinner: React.FC = () => {
  return (
    <>
      <h1 className="translating-h1">Translating...</h1>
      <div className="cssload-wrap">
        <div className="cssload-circle">
          <Gb />
        </div>
        <div className="cssload-circle">
          <De />
        </div>
        <div className="cssload-circle">
          <Es />
        </div>
        <div className="cssload-circle">
          <Fr />
        </div>
        <div className="cssload-circle">
          <It />
        </div>
      </div>
    </>
  );
};

export default Spinner;
