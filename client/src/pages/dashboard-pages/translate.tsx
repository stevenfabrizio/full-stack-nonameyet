import React from 'react';

import { useAppSelector } from '../../app/hooks';
import { CharCounter } from './wordCounter2';

import { YandexTranslator } from '@translate-tools/core/translators/YandexTranslator';

const translator = new YandexTranslator();
const parse = require('html-react-parser');

const Translate: React.FC = () => {
  //getting urls from redux sent from search component.
  const nonEnUrlReduxString: string = useAppSelector(
    (state) => state.nonEnUrlString.value
  );
  const enUrlReduxString: string = useAppSelector(
    (state) => state.enUrlString.value
  );

  //slurping up raw unparsed html
  const [slurpedEnText, setSlurpedEnText] =
    React.useState<string>('<h1>single</h1>');
  const [slurpedNonEnText, setSlurpedNonEnText] =
    React.useState<string>('<h1>single</h1>');

  //parsing the raw text to something html can use
  const enParsedText = parse(slurpedEnText);
  const nonEnParsedText = parse(slurpedNonEnText);

  const enUrl = `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&titles=${enUrlReduxString}`;
  const nonEnUrl = `https://de.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&titles=${nonEnUrlReduxString}`;

  const Clicked = async () => {
    try {
      //
      //ENGLISH LANG WIKI FIRST
      const enPage = await fetch(enUrl);
      const enJson = await enPage.json();

      //need to dig really deep to get the data. need to do many steps bc the object key has a different name for each wiki entry.
      const myEnObj = enJson.query.pages;
      const enKeys = Object.keys(myEnObj);
      const enWikipediaID = enKeys[0];
      const enRawContent = myEnObj[enWikipediaID].extract.toString();
      setSlurpedEnText(enRawContent);

      //
      //NON ENGLISH WIKI
      const nonEnPage = await fetch(nonEnUrl);
      const nonEnJson = await nonEnPage.json();

      //need to dig really deep to get the data. need to do many steps bc the object key has a different name for each wiki entry.
      const myNonEnObj = nonEnJson.query.pages;
      const nonEnKeys = Object.keys(myNonEnObj);
      const nonEnWikipediaID = nonEnKeys[0];
      const nonEnRawContent = myNonEnObj[nonEnWikipediaID].extract.toString();

      CharCounter(nonEnRawContent)
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

          {enParsedText}
        </div>
        <div className="tt-div">
          {nonEnUrlReduxString}
          <br /> <br />
          {nonEnParsedText}
        </div>
      </div>
    </>
  );
};

export default Translate;
