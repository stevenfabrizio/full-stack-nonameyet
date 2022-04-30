import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import DashHeader from './dashboard-components/dash-header';
import Search from './dashboard-pages/search';
import Translate from './dashboard-pages/translate';

const parse = require('html-react-parser');

const Dashboard: React.FC = () => {
  //redux variables here.
  const authStatus: boolean = useAppSelector(
    (state: { authBoolean: { value: any } }) => state.authBoolean.value
  );

  const navigate = useNavigate();

  //sending this to component to welcome them.
  const [slurpedText, setSlurpedText] = React.useState('the parsed text');
  const parsed = parse(slurpedText);

  const api = `https://fr.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&titles=Bill_Evans`;
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

  //if we get here accidently, leave if shouldnt be here.
  React.useEffect(() => {
    if (!authStatus) {
      navigate('/login');

      return;
    }
  }, [authStatus]);

  return (
    <>
      <div className="dashboard-container">
        <DashHeader />

        <button onClick={() => Clicked()}>go fetch</button>

        <div className="en-wiki">{parsed}</div>

        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
