import React from 'react';

import { CharTranslator } from './charTranslator';

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
  const nonEnUrlReduxString: string = useAppSelector(
    (state) => state.nonEnUrlString.value
  );
  const enUrlReduxString: string = useAppSelector(
    (state) => state.enUrlString.value
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
      //
      //ENGLISH LANG WIKI
      const enPage = await fetch(
        `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&titles=${enUrlReduxString}`
      );
      const enJson = await enPage.json();

      //need to dig really deep to get the data. need to do many steps bc the object key has a different name for each wiki entry.
      const myEnObj = enJson.query.pages;
      const enKeys = Object.keys(myEnObj);
      const enWikipediaID = enKeys[0];
      const enRawContent = myEnObj[enWikipediaID].extract.toString();

      dispatch(nonParsedEnState(enRawContent.toString()));

      //
      //NON ENGLISH WIKI
      const nonEnPage = await fetch(
        `https://${languageReduxString}.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&titles=${nonEnUrlReduxString}`
      );
      const nonEnJson = await nonEnPage.json();

      //need to dig really deep to get the data. need to do many steps bc the object key has a different name for each wiki entry.
      const myNonEnObj = nonEnJson.query.pages;
      const nonEnKeys = Object.keys(myNonEnObj);
      const nonEnWikipediaID = nonEnKeys[0];
      const nonEnRawContent = myNonEnObj[nonEnWikipediaID].extract.toString();

      const translatedIntoEnNonParsed = CharTranslator(nonEnRawContent);

      dispatch(
        nonParsedNonEnState((await translatedIntoEnNonParsed).toString())
      );
      dispatch(stateTranslatingFalse());
      dispatch(stateTranslatedTrue());
    } catch (error) {
      console.log(`bad something: ${error}`);
      //   dispatch(
      //     nonParsedEnState(
      //       `<span>Problem fetching content.</span>
      //       <br /><br />
      //       <span>${error}</span>`
      //     )
      //   );
      //   dispatch(
      //     nonParsedNonEnState(
      //       `<span>Problem fetching content.</span>
      //       <br /><br />
      //       <span>${error}</span>`
      //     )
      //   );
    }
  };

  //when arriving here from clicking translate, reset state and fetch wiki content.
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
        <h1>Nothing to translate.</h1>
      ) : (
        <></>
      )}

      {translatingState === false && translatedState === true ? (
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
      )}

      {translatingState === true ? (
        <div className="spinner">
          <div className="dot1"></div>
          <div className="dot2"></div>
        </div>
      ) : (
        <></>
      )}

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
