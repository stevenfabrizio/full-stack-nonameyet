import React from 'react';

import { Gb, De, Es, Fr, It } from 'react-flags-select';
import { CharTranslator } from './charTranslator';
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

const parse = require('html-react-parser');

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
    (state: { translatingBoolean: { value: any } }) =>
      state.translatingBoolean.value
  );
  const translatedState: boolean = useAppSelector(
    (state: { translatedBoolean: { value: any } }) =>
      state.translatedBoolean.value
  );

  //parsing the raw strings to for html formatting
  const enParsedText = parse(nonParsedEnReduxString);
  const nonEnParsedText = parse(nonParsedNonEnReduxString);

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

      const translatedIntoEnNonParsed = CharTranslator(
        nonEnRawContent,
        languageReduxString
      );

      dispatch(
        nonParsedNonEnState((await translatedIntoEnNonParsed).toString())
      );

      dispatch(stateTranslatingFalse());
      dispatch(stateTranslatedTrue());
    } catch (error) {
      console.log(`bad something: ${error}`);
    }
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
      {/* not translating nor havent translated yet */}
      {translatingState === false && translatedState === false ? (
        <h1>Nothing has been translated yet.</h1>
      ) : (
        <></>
      )}

      {/* we have previously translated */}
      {translatingState === false && translatedState === true ? (
        <div className="translated-text">
          <div className="tt-div">
            <p style={{ fontSize: '3.5rem', marginBottom: '4px' }}>
              <Gb />
            </p>
            <h1>{enUrlReduxString.replace('_', ' ')}</h1>
            {enParsedText}
          </div>
          <div className="tt-div">
            <p style={{ fontSize: '3.5rem', marginBottom: '4px' }}>
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

      {/* translating */}
      {translatingState === true ? <Spinner /> : <></>}

      {/* {translatingState === true ? (
        <div className="translated-text">
          <div className="tt-div">
            {enUrlReduxString}
            <br />
            {enParsedText}
          </div>
          <div className="tt-div">
            {nonEnUrlReduxString}
            <br /> <br />
            {nonEnParsedText}
          </div>
        </div>
      ) : (
        <></>
      )} */}
    </>
  );
};

export default Translate;
