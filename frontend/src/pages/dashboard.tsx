import React from 'react';
import wiki from 'wikipedia';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { stateFalse } from '../features/auth/authSlice';

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

  //"https://" + activeLanguage + ".wikipedia.org/w/api.php?action=opensearch&namespace=0&suggest=&search=
  //https://apis.ccbp.in/wiki-search?search=
  //https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&explaintext=false&exintro&titles=belgium
  //https://en.wikipedia.org/w/api.php?format=json&action=parse&page=belgium  response['parse'].text['*'];

  //https://en.wikipedia.org/w/api.php?format=json&action=parse&page=belgium
  // let headerss= headers.set('Content-Type', 'application/json; charset=utf-8');

  //'https://en.wikipedia.org/w/api.php?action=query&format=json&gsrlimit=15&generator=search' +
  // '&origin=*' + // <-- this is the magic ingredient!
  // '&gsrsearch='q, function(data){ /* ... */ }
  var api = `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=parse&page=belgium`;
  const Clicked = async () => {
    try {
      const page = await fetch(api);
      const results = await page.json();
      // console.log(page);
      //Response of type @Page object
      // const summary = await page.summary();
      // const stringy : string = page[0].text[0]
      console.log(results['0'].text['0']);
      // setSlurpedText(summary.extract)
      // setSlurpedText(summary)
      //Response of type @wikiSummary - contains the intro and the main image
    } catch (error) {
      console.log('bad');
      //=> Typeof wikiError
    }
  };

  //remove localstorage, redux state on logout. nav to login.
  const Logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    localStorage.removeItem('enteredEmail');
    localStorage.removeItem('enteredPassword');
    localStorage.removeItem('LoggedInOrNot');

    dispatch(stateFalse());
    navigate('/login');
  };

  //if we get here accidently, leave if shouldnt be here. get the name from user from localstorage if we should.
  React.useEffect(() => {
    if (!authStatus) {
      navigate('/login');
    }

    const usersName: string | null = localStorage.getItem('name');
    if (typeof usersName === 'string') {
      setName(usersName);
    }
  }, []);

  return (
    <>
      <h2>Welcome, {name}</h2>
      <button onClick={() => Clicked()}>go fetch</button>
      <p>{slurpedText}</p>
      <button onClick={(e) => Logout(e)}>Logout</button>
    </>
  );
};

export default Dashboard;
