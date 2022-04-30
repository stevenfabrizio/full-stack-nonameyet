import React from 'react';

import { useAppDispatch } from '../../app/hooks';

import { enUrlState } from '../../features/enUrl/enUrlSlice';
import { nonEnUrlState } from '../../features/nonEnUrl/nonEnUrlSlice';

const parse = require('html-react-parser');

const Search: React.FC = () => {
  const dispatch = useAppDispatch();

  //sending this to component to welcome them.
  const [slurpedText, setSlurpedText] = React.useState('the parsed text');
  const [searchInput, setSearchInput] = React.useState('');

  const parsedText = parse(slurpedText);
  const [parsedEnResults, setParsedEnResults] = React.useState<[]>([]);
  const [parsedNonEnResults, setParsedNonEnResults] = React.useState<[]>([]);

  //get urls from search results.
  const [enUrls, setEnUrls] = React.useState<[]>([]);
  const [nonEnUrls, setNonEnUrls] = React.useState<[]>([]);

  const api = `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&titles=Bill_Evans`;
  const Clicked = async () => {
    try {
      const page = await fetch(api);
      const results = await page.json();

      //get wikipedia ID from the fetch
      const myObj = results.query.pages;
      const keys = Object.keys(myObj);
      const wikipediaID = keys[0];
      const theContent = myObj[wikipediaID].extract;

      console.log(theContent);
      setSlurpedText(theContent);
    } catch (error) {
      console.log(`bad fetch or request or something: ${error}`);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const enResultsUrl = `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=`;
  const nonEnResultsUrl = `https://de.wikipedia.org/w/api.php?origin=*&action=opensearch&search=`;

  const SearchForResults = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const refinedSearchInput = searchInput.replace(' ', '-');

      //english lang part
      const enPage = await fetch(`${enResultsUrl}` + `${refinedSearchInput}`);
      const enResults = await enPage.json();

      console.log(enResults[1]);
      setParsedEnResults((parsedEnResults) => enResults[1]);
      dispatch(enUrlState(enResults[3]));
      setEnUrls((enUrls) => enResults[3]);

      //non english part
      const nonEnPage = await fetch(
        `${nonEnResultsUrl}` + `${refinedSearchInput}`
      );
      const nonEnResults = await nonEnPage.json();

      console.log(nonEnResults[1]);
      setParsedNonEnResults((parsedNonEnResults) => nonEnResults[1]);
      setNonEnUrls((nonEnUrls) => nonEnResults[3]);
      dispatch(nonEnUrlState(nonEnResults[3]));
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

  return (
    <>
      <form onSubmit={(e) => SearchForResults(e)}>
        <input
          type="text"
          placeholder="Search your topic here"
          value={searchInput}
          onChange={(e) => onChange(e)}
        ></input>
        <button type="submit">Submit</button>
      </form>

      <div className="search-containers">
        <ul className="en-results">
          {parsedEnResults.map((a: string) => (
            <li key={a}>{a}</li>
          ))}
        </ul>

        <ul className="nonen-results">
          {parsedNonEnResults.map((a: string) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>

      <button onClick={() => Clicked()}>go fetch</button>
      <div className="en-wiki">{parsedText}</div>
    </>
  );
};

export default Search;
