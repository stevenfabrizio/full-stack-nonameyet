import React from 'react';

import { useAppDispatch } from '../../app/hooks';

import { enUrlState } from '../../features/enUrl/enUrlSlice';
import { nonEnUrlState } from '../../features/nonEnUrl/nonEnUrlSlice';

// const parse = require('html-react-parser');

const Search: React.FC = () => {
  const dispatch = useAppDispatch();

  //sending this to component to welcome them.

  const [searchInput, setSearchInput] = React.useState<string>('');
  const [parsedEnResults, setParsedEnResults] = React.useState<[]>([]);
  const [parsedNonEnResults, setParsedNonEnResults] = React.useState<[]>([]);
  const [enUrls, setEnUrls] = React.useState<[]>([]);
  const [nonEnUrls, setNonEnUrls] = React.useState<[]>([]);
  // const [clickedEnUrl, setClickedEnUrl] = React.useState<string>(
  //   'https://en.wikipedia.org/wiki/Richard_Wagner'
  // );
  // const [clickedNonEnUrl, setClickedNonEnUrl] = React.useState<string>(
  //   'https://de.wikipedia.org/wiki/Richard_Wagner'
  // );

  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchInput(e.target.value);
  // };

  const enResultsUrl = `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=`;
  const nonEnResultsUrl = `https://de.wikipedia.org/w/api.php?origin=*&action=opensearch&search=`;

  const SearchForResults = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const refinedSearchInput = searchInput.replace(' ', ' ');

      //
      //english lang part
      const enPage = await fetch(`${enResultsUrl}` + `${refinedSearchInput}`);
      const enResults = await enPage.json();

      setParsedEnResults(() => enResults[1]);
      // setParsedEnResults((parsedEnResults) => enResults[1]);

      setEnUrls(() => enResults[3]);
      // setEnUrls((enUrls) => enResults[3]);

      dispatch(enUrlState(enResults[3]));

      //
      //non english part
      const nonEnPage = await fetch(
        `${nonEnResultsUrl}` + `${refinedSearchInput}`
      );
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

  const ClickedAnEnSearchResult = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const ClickedElement: HTMLLIElement = e.target as HTMLLIElement;

    dispatch(enUrlState(ClickedElement.innerHTML));

    // console.log(ClickedElement.innerHTML);
    // setClickedEnUrl(ClickedElement.innerHTML);
  };

  const ClickedANonEnSearchResult = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const ClickedElement: HTMLLIElement = e.target as HTMLLIElement;

    dispatch(nonEnUrlState(ClickedElement.innerHTML));

    // console.log(ClickedElement.innerHTML);
    // setClickedNonEnUrl(ClickedElement.innerHTML);
  };
  return (
    <>
      <div className="search-containers">
        <form onSubmit={(e) => SearchForResults(e)}>
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
            <li key={a} onClick={(e) => ClickedAnEnSearchResult(e)}>
              {a}
            </li>
          ))}
        </ul>

        <ul className="nonen-results">
          {parsedNonEnResults.map((a: string) => (
            <li key={a} onClick={(e) => ClickedANonEnSearchResult(e)}>
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
