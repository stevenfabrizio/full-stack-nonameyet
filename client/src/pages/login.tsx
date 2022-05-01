import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { stateFalse, stateTrue } from '../features/auth/authSlice';

const Login: React.FC = () => {
  //redux stuff
  const dispatch = useAppDispatch();
  const authStatus: boolean = useAppSelector(
    (state: { authBoolean: { value: any } }) => state.authBoolean.value
  );

  const navigate = useNavigate();
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

  //match login data with server, authenticate if good.
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

      const parseResponse = await response.json();

      if (parseResponse.LoggedIn) {
        localStorage.setItem('name', parseResponse.TheirName);
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

  //on component load, go to dashboard instead if we should be logged in.
  React.useEffect(() => {
    if (authStatus) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <div className="login-container">
        <h1>Login</h1>

        <form onSubmit={ClickedSubmit}>
          <input
            type="text"
            name="email"
            placeholder="some@email.whatever"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder=""
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Login;
