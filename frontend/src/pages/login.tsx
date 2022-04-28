import React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { stateFalse, stateTrue } from '../features/jwt/jwtSlice';

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const [input, setInput] = React.useState({
    email: '',
    password: '',
  });

  const { email, password } = input;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const ClickedSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const body = { email, password };

      localStorage.setItem('enteredEmail', email);
      localStorage.setItem('enteredPassword', password);

      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      console.log(JSON.stringify(body));

      const parseRes = await response.json();

      console.log(parseRes);

      if (parseRes.LoggedIn) {

        console.log('good!');
        dispatch(stateTrue());
        // setAuth(true);
        // toast.success("Logged in Successfully");
      } else {
        dispatch(stateFalse());
        // setAuth(false);
        // toast.error(parseRes);
      }
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={ClickedSubmit}>
        <input
          type="text"
          name="email"
          placeholder="ag55@gmail.com"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="nopassword"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <button type="submit">Submit</button>
      </form>
      <Link to="/register">Register</Link>
    </>
  );
};

export default Login;
