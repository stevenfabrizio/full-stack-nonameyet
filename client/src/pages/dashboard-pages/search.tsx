import React from 'react';
import { useNavigate } from 'react-router-dom';

import { De, Es, Fr, Gb, It } from 'react-flags-select';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { enUrlState } from '../../features/enUrl/enUrlSlice';
import { enUrlsState } from '../../features/enUrl/enUrlsSlice';
import { nonEnUrlState } from '../../features/nonEnUrl/nonEnUrlSlice';
import { nonEnUrlsState } from '../../features/nonEnUrl/nonEnUrlsSlice';
import { nonParsedEnState } from '../../features/translate/nonParsedEnSlice';
import { nonParsedNonEnState } from '../../features/translate/nonParsedNonEnSlice';
import {
  stateTranslatingFalse,
  stateTranslatingTrue,
} from '../../features/translate/translatingSlice';
import { languageState } from '../../features/language/languageSlice';

const parse = require('html-react-parser');

const Search: React.FC = () => {
  //redux states
  const dispatch = useAppDispatch();
  const languageReduxString: string = useAppSelector(
    (state) => state.languageString.value
  );
  const translatingState: boolean = useAppSelector(
    (state: { translatingBoolean: { value: boolean } }) =>
      state.translatingBoolean.value
  );
  const reduxSelectedEnResut: string = useAppSelector(
    (state) => state.nonEnUrlString.value
  );
  const reduxSelectedNonEnResult: string = useAppSelector(
    (state) => state.enUrlString.value
  );
  const reduxResultsEn: string[] = useAppSelector(
    (state) => state.enUrlsArray.value
  );
  const reduxResultsNonEn: string[] = useAppSelector(
    (state) => state.nonEnUrlsArray.value
  );

  const navigate = useNavigate();
  const [searchInput, setSearchInput] = React.useState<string>('');

  const SearchForResults = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //english lang part
      const enResponse = await fetch(
        `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${searchInput}`
      );
      const enParsedResponse = await enResponse.json();
      dispatch(enUrlsState(enParsedResponse[1]));

      //non english part
      const nonEnResponse = await fetch(
        `https://${languageReduxString}.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${searchInput}`
      );
      const nonEnParsedResponse = await nonEnResponse.json();

      dispatch(nonEnUrlsState(nonEnParsedResponse[1]));
    } catch (error) {
      console.error('Beega Probleema: ' + error);
    }
  };

  //hightlights clicked li, dispatches it to state.
  const ClickedAnEnSearchResult = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const ClickedElement: HTMLLIElement = e.target as HTMLLIElement;

    const allEnClickableElements: NodeListOf<HTMLLIElement> =
      document.querySelectorAll('.en-search-result');
    for (let i = 0; i < allEnClickableElements.length; i++) {
      allEnClickableElements[i].style.fontWeight = '500';
    }
    ClickedElement.style.fontWeight = '600';

    dispatch(enUrlState(ClickedElement.innerHTML.replace(' ', '_')));
  };

  //highlights clicked li, dispatches it to state.
  const ClickedANonEnSearchResult = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const ClickedElement: HTMLLIElement = e.target as HTMLLIElement;

    const allNonEnClickableElements: NodeListOf<HTMLLIElement> =
      document.querySelectorAll('.non-en-search-result');
    for (let i = 0; i < allNonEnClickableElements.length; i++) {
      allNonEnClickableElements[i].style.fontWeight = '500';
    }
    ClickedElement.style.fontWeight = '600';

    dispatch(nonEnUrlState(ClickedElement.innerHTML.replace(' ', '_')));
  };

  //navigate to translate component when clicked.
  const Translate = () => {
    dispatch(nonParsedEnState(''));
    dispatch(nonParsedNonEnState(''));
    dispatch(stateTranslatingTrue());

    navigate('/translate');
  };

  //update dropdown header with clicked slice inner html
  const ClickedLangFn = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const clickedLanguage: HTMLSpanElement = e.target as HTMLSpanElement;

    dispatch(
      languageState(clickedLanguage.innerHTML.slice(0, 2).toLowerCase())
    );

    //now reset all search results
    dispatch(enUrlState(''));
    dispatch(nonEnUrlState(''));
    dispatch(enUrlsState([]));
    dispatch(nonEnUrlsState([]));
  };

  //if already translating on component load, cancel it.
  React.useEffect(() => {
    const deElement: HTMLSpanElement = document.querySelector(
      '.german-span'
    ) as HTMLSpanElement;

    if (translatingState) {
      dispatch(enUrlState(''));
      dispatch(nonEnUrlState(''));
      dispatch(stateTranslatingFalse());
    }
  }, []);

  return (
    <>
      <div className="search-containers">
        <div className="form-container">
          <div></div>

          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
              SearchForResults(e)
            }
          >
            <input
              style={{ textIndent: '2px' }}
              autoFocus
              type="text"
              placeholder="Search your topic here"
              value={searchInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchInput(e.target.value);
              }}
            ></input>
            <button className="mag-glass" type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                opacity={0.7}
              >
                <title>search</title>
                <path
                  fillRule="evenodd"
                  d="M12.2 13.6a7 7 0 1 1 1.4-1.4l5.4 5.4-1.4 1.4-5.4-5.4zM13 8A5 5 0 1 1 3 8a5 5 0 0 1 10 0z"
                />
              </svg>
            </button>
          </form>

          <div className="header">
            <div className="dropdown">
              <span className="header-span">
                {' '}
                {languageReduxString === 'it' ? (
                  <>
                    It <It />
                  </>
                ) : (
                  <></>
                )}
                {languageReduxString === 'de' ? (
                  <>
                    De <De />
                  </>
                ) : (
                  <></>
                )}
                {languageReduxString === 'fr' ? (
                  <>
                    Fr <Fr />
                  </>
                ) : (
                  <></>
                )}
                {languageReduxString === 'es' ? (
                  <>
                    Es <Es />
                  </>
                ) : (
                  <></>
                )}{' '}
              </span>
              <div className="dropdown-menu">
                <span
                  className="german-span"
                  onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
                    ClickedLangFn(e)
                  }
                >
                  De
                  <De />
                </span>
                <span
                  onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
                    ClickedLangFn(e)
                  }
                >
                  Es
                  <Es />
                </span>
                <span
                  onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
                    ClickedLangFn(e)
                  }
                >
                  Fr
                  <Fr />
                </span>
                <span
                  onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
                    ClickedLangFn(e)
                  }
                >
                  It
                  <It />
                </span>
              </div>
            </div>
          </div>

          <div></div>
        </div>

        <div className="search-flags">
          <div></div>
          <h1 style={{ fontSize: '4rem' }}>
            <Gb />
          </h1>
          <h1 style={{ fontSize: '4rem' }}>
            {languageReduxString === 'it' ? <It /> : <></>}
            {languageReduxString === 'de' ? <De /> : <></>}
            {languageReduxString === 'fr' ? <Fr /> : <></>}
            {languageReduxString === 'es' ? <Es /> : <></>}
          </h1>
          <div></div>
        </div>

        <div className="left-en-results"></div>
        <ul className="en-results">
          {reduxResultsEn.map((a: string) => (
            <li
              key={a}
              className="en-search-result"
              onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) =>
                ClickedAnEnSearchResult(e)
              }
            >
              {a}
            </li>
          ))}
        </ul>

        <ul className="non-en-results">
          {reduxResultsNonEn.map((a: string) => (
            <li
              key={a}
              className="non-en-search-result"
              onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) =>
                ClickedANonEnSearchResult(e)
              }
            >
              {a}
            </li>
          ))}
        </ul>
        <div className="right-non-en-results"></div>

        {reduxSelectedNonEnResult.length > 0 &&
        reduxSelectedEnResut.length > 0 ? (
          <button className="search-translate-btn" onClick={() => Translate()}>
            Translate
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default Search;
