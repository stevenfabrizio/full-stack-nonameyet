import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { stateFalse, stateTrue } from '../features/auth/authSlice';

const Register: React.FC = () => {
  //redux stuff
  const dispatch = useAppDispatch();
  const authStatus: boolean = useAppSelector(
    (state: { authBoolean: { value: boolean } }) => state.authBoolean.value
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
      // console.log(body);

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
        toast.error(`${parseResponse}`)
      }
    } catch (error) {
      toast.error(`ha ${error}`)
      // console.error('Exception ' + error);
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
      <div></div>

      <div className="register-container">
        <h1>Create account</h1>

        <p className='create-acc-p'>
          Consider using a username other than your real name, as usernames are
          public and cannot be made private later.
        </p>

        <form onSubmit={ClickedSubmit} className="register-form">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => onChange(e)}
          ></input>

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => onChange(e)}
          ></input>

          <label>Username</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your username"
            value={name}
            onChange={(e) => onChange(e)}
          ></input>
          <button type="submit">Create your account</button>
        </form>

        <div className="login-register-right-side">
          <h2>Wikipedia is made by people like you.</h2>
          <h3>{Math.round(Date.now() / 1500).toLocaleString()}</h3>
          <p>edits</p>
          <h3>{Math.round(Date.now() / 250000).toLocaleString()}</h3>
          <p>articles</p>
          <h3>{Math.round(Date.now() / 15000000).toLocaleString()}</h3>
          <p>recent contributors</p>
        </div>
      </div>

      <div className='empty-reg-div'></div>
    </>
  );
};

export default Register;
