import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { stateFalse, stateTrue } from '../features/auth/authSlice';

const Login: React.FC = () => {
  //redux stuff
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authStatus: boolean = useAppSelector(
    (state: { authBoolean: { value: any } }) => state.authBoolean.value
  );

  const [input, setInput] = React.useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });
  const { email, password } = input;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const ClickedSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const body = { email, password };

    localStorage.setItem('enteredEmail', email);
    localStorage.setItem('enteredPassword', password);

    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.LoggedIn) {
        localStorage.setItem('name', parseRes.TheirName);

        dispatch(stateTrue());
        navigate('/');
      } else {
        dispatch(stateFalse());
      }
    } catch (error) {
      dispatch(stateFalse());
      console.error('Exception ' + error);
    }
  };

  //on page load, nav to dashboard if we should be logged in.
  React.useEffect(() => {
    if (authStatus) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={ClickedSubmit}>
        <input
          type="text"
          name="email"
          placeholder="some@email.whatever"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder=""
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
