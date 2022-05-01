import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { stateFalse, stateTrue } from '../features/auth/authSlice';

const Register: React.FC = () => {
  //redux stuff
  const dispatch = useAppDispatch();
  const authStatus: boolean = useAppSelector(
    (state: { authBoolean: { value: any } }) => state.authBoolean.value
  );

  const navigate = useNavigate();
  const [inputs, setInputs] = React.useState<{
    email: string;
    password: string;
    name: string;
  }>({
    email: '',
    password: '',
    name: '',
  });
  const { email, password, name } = inputs;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  //attempt to register into database
  const ClickedSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const body = { email, password, name };
      console.log(body);

      localStorage.setItem('enteredEmail', email);
      localStorage.setItem('enteredPassword', password);
      localStorage.setItem('name', name);

      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      if (parseResponse.LoggedIn) {
        localStorage.setItem('enteredEmail', email);
        localStorage.setItem('enteredPassword', password);
        dispatch(stateTrue());

        navigate('/');
      } else {
        dispatch(stateFalse());
      }
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

  //on page load, go to dashboard if we should be logged in.
  React.useEffect(() => {
    if (authStatus) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <div className="register-container">
        <h1>Register</h1>

        <form onSubmit={ClickedSubmit} className="register-form">
          <input
            type="email"
            name="email"
            placeholder="222@aol.com"
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
            placeholder="usernamelol"
            value={name}
            onChange={(e) => onChange(e)}
          ></input>
          <button type="submit">Submit</button>
        </form>

        <div></div>
      </div>
    </>
  );
};

export default Register;
