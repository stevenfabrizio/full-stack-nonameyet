import React from 'react';

import { useAppSelector } from '../../app/hooks';

const Translate: React.FC = () => {
  //getting urls from redux sent from search component.
  const nonEnUrlArrayy: string[] = useAppSelector(
    (state) => state.nonEnUrlArray.value
  );
  const enUrlArrayy: string[] = useAppSelector((state) => state.enUrlArray.value);

  return (
    <>
      <h1>translated</h1>

      <ul>
        {nonEnUrlArrayy.map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>

      <ul>
        {enUrlArrayy.map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>
    </>
  );
};

export default Translate;
