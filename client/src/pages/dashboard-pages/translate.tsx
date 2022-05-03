import React from 'react';

import { YandexTranslator } from '@translate-tools/core/translators/YandexTranslator';
import { Gb, De, Es, Fr, It } from 'react-flags-select';
import Spinner from '../dashboard-components/spinner';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  stateTranslatingFalse,
  stateTranslatingTrue,
} from '../../features/translate/translatingSlice';
import {
  stateTranslatedFalse,
  stateTranslatedTrue,
} from '../../features/translate/translatedSlice';
import { nonParsedEnState } from '../../features/translate/nonParsedEnSlice';
import { nonParsedNonEnState } from '../../features/translate/nonParsedNonEnSlice';

require('./translate.css')
const parse = require('html-react-parser');
const translator = new YandexTranslator();

const Translate: React.FC = () => {
  //redux variables
  const dispatch = useAppDispatch();
  const languageReduxString: string = useAppSelector(
    (state) => state.languageString.value
  );
  const enUrlReduxString: string = useAppSelector(
    (state) => state.enUrlString.value
  );
  const nonEnUrlReduxString: string = useAppSelector(
    (state) => state.nonEnUrlString.value
  );
  const nonParsedEnReduxString: string = useAppSelector(
    (state) => state.nonParsedEnString.value
  );
  const nonParsedNonEnReduxString: string = useAppSelector(
    (state) => state.nonParsedNonEnString.value
  );
  const translatingState: boolean = useAppSelector(
    (state: { translatingBoolean: { value: boolean } }) =>
      state.translatingBoolean.value
  );
  const translatedState: boolean = useAppSelector(
    (state: { translatedBoolean: { value: boolean } }) =>
      state.translatedBoolean.value
  );

  //parsing the raw strings to for html formatting
  const enParsedText = parse(nonParsedEnReduxString);
  const nonEnParsedText = parse(nonParsedNonEnReduxString);
  const [counter, setCounter] = React.useState<number>(0);
  const [stringLength, setStringLength] = React.useState<number>(0);

  const ClickedTranslate = async () => {
    try {
      dispatch(stateTranslatingTrue());
      //ENGLISH LANG WIKI
      const enResponse = await fetch(
        `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&titles=${enUrlReduxString}`
      );
      const enUnparsedResponse = await enResponse.json();

      //need to dig really deep to get the data. need to do many steps bc the object key has a different name for each wiki entry.
      const myEnObj = enUnparsedResponse.query.pages;
      const enKeys = Object.keys(myEnObj);
      const enWikipediaArticleID = enKeys[0];
      const enRawContent = myEnObj[enWikipediaArticleID].extract.toString();

      dispatch(nonParsedEnState(enRawContent.toString()));

      //
      //NON ENGLISH WIKI
      const nonEnResponse = await fetch(
        `https://${languageReduxString}.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&titles=${nonEnUrlReduxString}`
      );
      const nonEnUnparsedResponse = await nonEnResponse.json();

      //need to dig really deep to get the data. need to do many steps bc the object key has a different name for each wiki entry.

      const myNonEnObj = nonEnUnparsedResponse.query.pages;
      const nonEnKeys = Object.keys(myNonEnObj);
      const nonEnWikipediaArticleID = nonEnKeys[0];
      const nonEnRawContent =
        myNonEnObj[nonEnWikipediaArticleID].extract.toString();

      setStringLength(nonEnRawContent.length);

      console.log(nonEnRawContent.length);
      console.log(stringLength);

      const translatedIntoEnNonParsed = CharTranslator(nonEnRawContent);

      dispatch(
        // nonParsedNonEnState((await translatedIntoEnNonParsed).toString())
        nonParsedNonEnState(await translatedIntoEnNonParsed)
      );

      dispatch(stateTranslatingFalse());
      dispatch(stateTranslatedTrue());
    } catch (error) {
      console.log(`bad something: ${error}`);
    }
  };

  const CharTranslator = async (data: string) => {
    let localCounter: number = 0;
    const stringLengths: number = data.length;
    let translatedString: string = '';
    setStringLength(data.length);

    //finally found a practical use for a while statement
    while (localCounter < stringLengths) {
      console.log(
        `Characters to be translated: ${stringLengths} 
        \n
        Characters translated: ${localCounter}.`
      );

      //taking chunks of 10k chars at a time. yandex's limit.
      let slicedStr = data.slice(localCounter, localCounter + 10000);

      //need to do this if statement for typescript to make yandex translator happy.
      if (
        languageReduxString != 'de' &&
        languageReduxString != 'es' &&
        languageReduxString != 'fr' &&
        languageReduxString != 'it'
      ) {
        return console.log('Error: Unknown Language Selected.');
      }

      const translating: string = await translator
        .translate(slicedStr, languageReduxString, 'en')
        .then((translate) => (translatedString = translatedString + translate));

      setCounter(localCounter + 10000);
      localCounter = localCounter + 10000;
    }

    return translatedString;
  };

  //when arriving here from clicking translate, reset states and fetch wiki content.
  React.useEffect(() => {
    if (translatingState) {
      dispatch(stateTranslatedFalse());
      dispatch(stateTranslatingFalse());

      ClickedTranslate();
    }
  }, []);

  return (
    <>
      {translatingState === false && translatedState === false ? (
        <h1 className='no-trans-yet'>Nothing has been translated yet.</h1>
      ) : (
        <></>
      )}

      {translatingState === false && translatedState === true ? (
        <div className="translated-text">
          <div className="tt-div">
            <p style={{ fontSize: '4rem', marginBottom: '4px' }}>
              <Gb />
            </p>
            <h1>{enUrlReduxString.replace('_', ' ')}</h1>
            {enParsedText}
          </div>
          <div className="tt-div">
            <p style={{ fontSize: '4rem', marginBottom: '4px' }}>
              {languageReduxString === 'it' ? <It /> : <></>}
              {languageReduxString === 'de' ? <De /> : <></>}
              {languageReduxString === 'fr' ? <Fr /> : <></>}
              {languageReduxString === 'es' ? <Es /> : <></>}
            </p>
            <h1>{nonEnUrlReduxString.replace('_', ' ')}</h1>
            {nonEnParsedText}
          </div>
        </div>
      ) : (
        <></>
      )}

      {translatingState === true ? (
        <>
          <Spinner stringLength={stringLength} counter={counter} />{' '}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Translate;
