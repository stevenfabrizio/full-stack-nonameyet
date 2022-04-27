import React from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../app/hooks';
import { stateFalse, stateTrue } from '../features/jwt/jwtSlice';

const Register: React.FC = () => {
  const dispatch = useAppDispatch();

  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
    name: '',
  });

  const { email, password, name } = inputs;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const ClickedSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const body = { email, password, name };
      console.log(body);

      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem('token', parseRes.jwtToken);
        dispatch(stateTrue());
        //toast success
      }
    } catch (error) {
      dispatch(stateFalse());
      console.error('Exception ' + error);
    }
  };

  return (
    <>
      <h1>register</h1>

      <form className="register-form">
        <input
          type="email"
          name="email"
          placeholder="22@aol.com"
          value={email}
          onChange={(e) => onChange(e)}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => onChange(e)}
        ></input>
        <input
          type="text"
          name="name"
          placeholder="username"
          value={name}
          onChange={(e) => onChange(e)}
        ></input>
        <button type="submit" onSubmit={(e) => ClickedSubmit(e)}>
          Submit
        </button>
      </form>
      <Link to="/login">Login</Link>
      <div></div>
    </>
  );
};

export default Register;
