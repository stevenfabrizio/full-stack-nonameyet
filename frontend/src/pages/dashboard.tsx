import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { stateFalse } from '../features/auth/authSlice';
// const parse = require('html-react-parser');

const Dashboard: React.FC = () => {
  //redux variables here.
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus: boolean = useAppSelector(
    (state: { authBoolean: { value: any } }) => state.authBoolean.value
  );

  //sending this to component to welcome them.
  const [name, setName] = React.useState('friend');
  const [slurpedText, setSlurpedText] = React.useState('234');
  // const parsed = parse(slurpedText);

  //"https://" + activeLanguage + ".wikipedia.org/w/api.php?action=opensearch&namespace=0&suggest=&search=
  //https://apis.ccbp.in/wiki-search?search=
  //https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&explaintext=false&exintro&titles=belgium
  //https://en.wikipedia.org/w/api.php?format=json&action=parse&page=belgium  response['parse'].text['*'];

  //https://en.wikipedia.org/w/api.php?format=json&action=parse&page=belgium
  // let headerss= headers.set('Content-Type', 'application/json; charset=utf-8');

  //'https://en.wikipedia.org/w/api.php?action=query&format=json&gsrlimit=15&generator=search' +
  // '&origin=*' + // <-- this is the magic ingredient!
  // '&gsrsearch='q, function(data){ /* ... */ }
  var api = `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&titles=Bill_Evans`;
  const Clicked = async () => {
    try {
      const page = await fetch(api);
      const results = await page.json();

      //get wikipedia ID from the fetch
      const myObj = results.query.pages;
      const keys = Object.keys(myObj);
      const wikipediaID = keys[0];
      const theContent = myObj[wikipediaID].extract;

      setSlurpedText(theContent);
    } catch (error) {
      console.log('bad fetch or request');
    }
  };

  //remove localstorage, redux state on logout. nav to login.
  // const Logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault();

  //   localStorage.removeItem('enteredEmail');
  //   localStorage.removeItem('enteredPassword');
  //   localStorage.removeItem('LoggedInOrNot');

  //   dispatch(stateFalse());
  //   navigate('/login');
  // };

  //if we get here accidently, leave if shouldnt be here. get the name from user from localstorage if we should.
  React.useEffect(() => {
    if (!authStatus) {
      navigate('/login');

      return;
    }

    const usersName: string | null = localStorage.getItem('name');
    if (typeof usersName === 'string') {
      setName(usersName);
    }
  }, [authStatus]);

  return (
    <>
      <div className="dashboard-container">
        <h1>Welcome, {name}</h1>

        <button onClick={() => Clicked()}>go fetch</button>

        {/* <div className="en-wiki">{parsed}</div> */}

        {/* <button onClick={(e) => Logout(e)}>Logout</button> */}
      </div>
    </>
  );
};

export default Dashboard;
