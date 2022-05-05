import React from 'react';
import { Gb, De, Es, Fr, It } from 'react-flags-select';

require('./spinner.css');

type SpinnerProps = {
  stringLength: number;
  counter: number;
};

const Spinner: React.FC<SpinnerProps> = (props) => {
  const [counter, setCounter] = React.useState<number>(0);
  const [stringLength, setStringLength] = React.useState<number>(0);

  React.useEffect(() => {
    setCounter(props.counter);
  }, [props.counter]);

  React.useEffect(() => {
    setStringLength(props.stringLength);
  }, [props.stringLength]);

  return (
    <>
      {counter > 9999 && stringLength > 1 ? (
        <>
          <h1 className="translating-h1-1">
            Characters to be translated: &ensp;{stringLength}
          </h1>
          <h1 className="translating-h1-2">
            Percent complete:&ensp;{Math.round((counter / stringLength) * 100)}%
          </h1>
        </>
      ) : (
        <></>
      )}

      {counter < 9999 && stringLength > 1 ? (
        <>
          <h1 className="translating-h1-1">
            Characters to be translated: &ensp;{stringLength}
          </h1>
        </>
      ) : (
        <></>
      )}

      {stringLength > 1 ? (
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
      ) : (
        <></>
      )}
    </>
  );
};

export default Spinner;
