import React from 'react';

const Register: React.FC = () => {
  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
    name: '',
  });

  const { email, password, name } = inputs;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const ClickedSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <h1>register</h1>

      <form onSubmit={(e) => ClickedSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
        ></input>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
        ></input>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
        ></input>
      </form>
    </>
  );
};

export default Register;
