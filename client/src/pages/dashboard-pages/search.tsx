import React from 'react';
import { useNavigate } from 'react-router-dom';

import { De, Es, Fr, It } from 'react-flags-select';

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
  const [headerTxt, setHeaderTxt] = React.useState<string>(`De`);

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
      allEnClickableElements[i].style.backgroundColor = 'rgba(0,0,0,0)';
    }
    ClickedElement.style.backgroundColor = 'rgba(100,100,100,1)';

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
      allNonEnClickableElements[i].style.backgroundColor = 'rgba(0,0,0,0)';
    }
    ClickedElement.style.backgroundColor = 'rgba(100,100,100,1)';

    dispatch(nonEnUrlState(ClickedElement.innerHTML.replace(' ', '_')));
  };

  //navigate to translate component when clicked.
  const Translate = () => {
    dispatch(nonParsedEnState(''));
    dispatch(nonParsedNonEnState(''));
    dispatch(stateTranslatingTrue());

    navigate('/translate');
  };

  //change header text to clicked innerhtml and update redux states.
  const ClickedLang = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const clickedLanguage: HTMLSpanElement = e.target as HTMLSpanElement;

    setHeaderTxt(parse(clickedLanguage.innerHTML));
    const currentLanguage: HTMLSpanElement =
      document.querySelector('.header-span')!;
    // currentLanguage.style.gridTemplateColumns = '1fr 1fr';

    //get the first two letters of clicked element which are one of de es fr it
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
    dispatch(enUrlState(''));
    dispatch(nonEnUrlState(''));

    const deElement: HTMLSpanElement = document.querySelector('.german-span') as HTMLSpanElement;
    //restyle grid template for two columns
    setHeaderTxt(parse(deElement.innerHTML))

    if (translatingState) {
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
              type="text"
              placeholder="Search your topic here"
              value={searchInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchInput(e.target.value);
              }}
            ></input>
            <button type="submit">Search</button>
          </form>

          <div className="header">
            <div className="dropdown">
              <span className="header-span">{headerTxt}</span>
              <div className="dropdown-menu">
                <span className='german-span'
                  onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
                    ClickedLang(e)
                  }
                >
                  De
                  <De />
                </span>
                <span
                  onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
                    ClickedLang(e)
                  }
                >
                  Es
                  <Es />
                </span>
                <span
                  onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
                    ClickedLang(e)
                  }
                >
                  Fr
                  <Fr />
                </span>
                <span
                  onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
                    ClickedLang(e)
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

        {reduxSelectedNonEnResult.length > 0 &&
        reduxSelectedEnResut.length > 0 ? (
          <button className="search-translate-btn" onClick={() => Translate()}>
            Translate!
          </button>
        ) : (
          <div></div>
        )}

        {/* <div className="non-en-search-result" style={{ display: 'none' }}></div> */}
      </div>
    </>
  );
};

export default Search;
