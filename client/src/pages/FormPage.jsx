import { useState } from 'react';
import axios from 'axios';

const FormPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [registerErrorMessage, setRegisterErrorMessage] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/api/v1/users/register', {
        username,
        password,
        passwordConfirm,
      });
      setRegisterErrorMessage('');
      alert('Registration completed');
    } catch (error) {
      console.log(error);
      setRegisterErrorMessage(error.response.data.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/api/v1/users/login', {
        username,
        password,
      });
      setLoginErrorMessage('');
      alert('Succesfully logged in');
      console.log(res.data.token);
    } catch (error) {
      console.log(error);
      setLoginErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="form-page">
      <div className="login">
        <h1>Log In</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {loginErrorMessage && (
            <p className="error-msg">{loginErrorMessage}</p>
          )}
          <button type="submit">Log in</button>
        </form>
      </div>
      <div className="register">
        <h1>Create an account</h1>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="passwordConfirm"
              id="password-confirm"
              name="passwordConfirm"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          {registerErrorMessage && (
            <p className="error-msg">{registerErrorMessage}</p>
          )}
          <button type="submit">Create account</button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
