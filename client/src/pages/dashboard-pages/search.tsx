import React from 'react';

import { useAppDispatch } from '../../app/hooks';
import { enUrlState } from '../../features/enUrl/enUrlSlice';
import { nonEnUrlState } from '../../features/nonEnUrl/nonEnUrlSlice';

const Search: React.FC = () => {
  const dispatch = useAppDispatch();

  const [searchInput, setSearchInput] = React.useState<string>('');

  const [parsedEnResults, setParsedEnResults] = React.useState<[]>([]);
  const [parsedNonEnResults, setParsedNonEnResults] = React.useState<[]>([]);
  const [enUrls, setEnUrls] = React.useState<[]>([]);
  const [nonEnUrls, setNonEnUrls] = React.useState<[]>([]);

  const enResultsUrl = `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=`;
  const nonEnResultsUrl = `https://de.wikipedia.org/w/api.php?origin=*&action=opensearch&search=`;

  const SearchForResults = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      //
      //english lang part
      const enPage = await fetch(`${enResultsUrl}` + `${searchInput}`);
      const enResults = await enPage.json();

      setParsedEnResults(() => enResults[1]);
      // setParsedEnResults((parsedEnResults) => enResults[1]);

      setEnUrls(() => enResults[3]);
      // setEnUrls((enUrls) => enResults[3]);

      dispatch(enUrlState(enResults[3]));

      //
      //non english part
      const nonEnPage = await fetch(`${nonEnResultsUrl}` + `${searchInput}`);
      const nonEnResults = await nonEnPage.json();

      setParsedNonEnResults(() => nonEnResults[1]);
      // setParsedNonEnResults((parsedNonEnResults) => nonEnResults[1]);

      setNonEnUrls(() => nonEnResults[3]);
      // setNonEnUrls((nonEnUrls) => nonEnResults[3]);

      dispatch(nonEnUrlState(nonEnResults[3]));
    } catch (error) {
      console.error('Beega Probleema ' + error);
    }
  };

  //hightlights clicked li
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

  //highlights clicked li
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
          <button type="submit">Submit</button>
        </form>

        <ul className="en-results">
          {parsedEnResults.map((a: string) => (
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
          {parsedNonEnResults.map((a: string) => (
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

        <div></div>
      </div>
    </>
  );
};

export default Search;
