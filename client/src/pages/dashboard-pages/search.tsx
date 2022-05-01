import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { enUrlState } from '../../features/enUrl/enUrlSlice';
import { enUrlsState } from '../../features/enUrl/enUrlsSlice';
import { nonEnUrlState } from '../../features/nonEnUrl/nonEnUrlSlice';
import { nonEnUrlsState } from '../../features/nonEnUrl/nonEnUrlsSlice';
import { stateTranslatingTrue } from '../../features/translate/translatingSlice';

const Search: React.FC = () => {
  //redux variables
  const dispatch = useAppDispatch();
  const reduxSelectedNonEnResult = useAppSelector(
    (state) => state.enUrlString.value
  );
  const reduxSelectedEnResut = useAppSelector(
    (state) => state.nonEnUrlString.value
  );
  const reduxResultsEn = useAppSelector((state) => state.enUrlsArray.value);
  const reduxResultsNonEn = useAppSelector(
    (state) => state.nonEnUrlsArray.value
  );

  const navigate = useNavigate();
  const [searchInput, setSearchInput] = React.useState<string>('');

  const SearchForResults = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      //
      //english lang part
      const enPage = await fetch(
        `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${searchInput}`
      );
      const enResults = await enPage.json();

      dispatch(enUrlsState(enResults[1]));

      //
      //non english part
      const nonEnPage = await fetch(
        `https://de.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${searchInput}`
      );
      const nonEnResults = await nonEnPage.json();

      dispatch(nonEnUrlsState(nonEnResults[1]));
    } catch (error) {
      console.error('Beega Probleema ' + error);
    }
  };

  //hightlights clicked li, dispatches it to state.
  const ClickedAnEnSearchResult = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const ClickedElement: HTMLLIElement = e.target as HTMLLIElement;

    const englishLis: NodeListOf<HTMLLIElement> =
      document.querySelectorAll('.en-search-result');
    for (let i = 0; i < englishLis.length; i++) {
      englishLis[i].style.backgroundColor = 'rgba(0,0,0,0)';
    }
    ClickedElement.style.backgroundColor = 'rgba(100,100,100,1)';

    dispatch(enUrlState(ClickedElement.innerHTML));
    // setClickedEnUrl(ClickedElement.innerHTML);
  };

  //highlights clicked li, dispatches it to state.
  const ClickedANonEnSearchResult = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const ClickedElement: HTMLLIElement = e.target as HTMLLIElement;

    const nonEnglishLis: NodeListOf<HTMLLIElement> = document.querySelectorAll(
      '.non-en-search-result'
    );
    for (let i = 0; i < nonEnglishLis.length; i++) {
      nonEnglishLis[i].style.backgroundColor = 'rgba(0,0,0,0)';
    }
    ClickedElement.style.backgroundColor = 'rgba(100,100,100,1)';

    dispatch(nonEnUrlState(ClickedElement.innerHTML));
    // setClickedNonEnUrl(ClickedElement.innerHTML);
  };

  //navigate to translate component when clicked.
  const Translate = () => {
    dispatch(stateTranslatingTrue());
    navigate('/translate');
  };

  //reset the selected topic on search component load because... why not idk?
  React.useEffect(() => {
    dispatch(enUrlState(''));
    dispatch(nonEnUrlState(''));
  }, []);

  return (
    <>
      <div className="search-containers">
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

        <div className="non-en-search-result" style={{ display: 'none' }}></div>
      </div>
    </>
  );
};

export default Search;
