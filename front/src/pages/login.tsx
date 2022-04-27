import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [input, setInput] = React.useState({
    email: '',
    password: '',
  });

  const { email, password } = input;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const ClickedSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const body = { email, password };

      const response = await fetch(
        'http://localhost:5000/authentication/login',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem('token', parseRes.jwtToken);

        // setAuth(true);
        // toast.success("Logged in Successfully");
      } else {
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

      <form onSubmit={() => ClickedSubmit}>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="password"
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
