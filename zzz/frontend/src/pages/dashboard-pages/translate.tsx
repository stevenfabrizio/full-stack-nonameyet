import React from 'react';

import { useAppSelector } from '../../app/hooks';

const parse = require('html-react-parser');
// const translates = require('@vitalets/google-translate-api');

const Translate: React.FC = () => {
  //getting urls from redux sent from search component.
  const nonEnUrlReduxString: string = useAppSelector(
    (state) => state.nonEnUrlString.value
  );
  const enUrlReduxString: string = useAppSelector(
    (state) => state.enUrlString.value
  );

  const [slurpedEnText, setSlurpedEnText] =
    React.useState<string>('<h1>single</h1>');
  const [slurpedNonEnText, setSlurpedNonEnText] =
    React.useState<string>('<h1>single</h1>');

  const enParsedText = parse(slurpedEnText);
  const nonEnParsedText = parse(slurpedNonEnText);

  const enapi = `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&titles=${enUrlReduxString}`;

  const nonenapi = `https://de.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&titles=${nonEnUrlReduxString}`;

  const Clicked = async () => {
    try {
      // console.log(enapi);
      const enpage = await fetch(enapi);
      const enresults = await enpage.json();

      //get wikipedia ID from the fetch
      const myEnObj = enresults.query.pages;
      const enkeys = Object.keys(myEnObj);
      const enwikipediaID = enkeys[0];
      const theenContent = myEnObj[enwikipediaID].extract.toString();
      setSlurpedEnText(theenContent);

      //NON ENGLISH
      // console.log(nonenapi);
      const nonenpage = await fetch(nonenapi);
      const nonenresults = await nonenpage.json();

      //get wikipedia ID from the fetch
      const mynonEnObj = nonenresults.query.pages;
      const nonenkeys = Object.keys(mynonEnObj);
      const nonenwikipediaID = nonenkeys[0];
      const thenonenContent = mynonEnObj[nonenwikipediaID].extract.toString();
      setSlurpedNonEnText(thenonenContent);
    } catch (error) {
      console.log(`bad fetch or request or something: ${error}`);
    }
  };

  React.useEffect(() => {
    console.log(nonEnUrlReduxString);
    console.log(enUrlReduxString);
  }, []);

  return (
    <>
      <h1>Translated</h1>

      <button onClick={() => Clicked()}>go fetch</button>

      <div className="translated-text">
        <div className="tt-div">
          {enUrlReduxString}
          <br></br>

          {slurpedEnText}
        </div>
        <div className="tt-div">
          {nonEnUrlReduxString}
          <br /> <br />
          {slurpedNonEnText}
        </div>
      </div>
    </>
  );
};

export default Translate;
