import { useState } from 'react';
import axios from 'axios';

const FormPage = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [registerErrorMessage, setRegisterErrorMessage] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const emptyRegisterFields = () => {
    if (
      registerUsername === '' ||
      registerPassword === '' ||
      passwordConfirm === ''
    ) {
      setRegisterErrorMessage('Missing fields!');
    }
  };

  const shortPasswordError = () => {
    if (registerPassword.length >= 1 && registerPassword.length < 8) {
      setRegisterErrorMessage('Password too short. Minimum 8 characters');
    }
  };

  const passwordMatch = () => {
    if (registerPassword !== passwordConfirm) {
      setRegisterErrorMessage('Passwords do not match');
    }
  };

  const shortUsername = () => {
    if (registerUsername.length >= 1 && registerUsername.length < 3) {
      setRegisterErrorMessage('Username must be 3 or more characters long');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post('http://localhost:3000/api/v1/users/register', {
        username: registerUsername,
        password: registerPassword,
        passwordConfirm,
      });
      setRegisterErrorMessage('');
      alert('Registration completed');
      setRegisterUsername('');
      setRegisterPassword('');
      setPasswordConfirm('');
    } catch (error) {
      console.log(error);
      setRegisterErrorMessage(error.response.data.message);
      shortPasswordError();
      passwordMatch();
      shortUsername();
      emptyRegisterFields();
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:3000/api/v1/users/login', {
        username: loginUsername,
        password: loginPassword,
      });
      setLoginErrorMessage('');
      alert('Succesfully logged in');
      console.log(res.data.token);
      setLoginUsername('');
      setLoginPassword('');
    } catch (error) {
      console.log(error);
      setLoginErrorMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
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
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          {loginErrorMessage && (
            <p className="error-msg">{loginErrorMessage}</p>
          )}
          <button type="submit">Log in</button>
        </form>
        {isLoading && <div className="spinner"></div>}
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
              onChange={(e) => setRegisterUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setRegisterPassword(e.target.value)}
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
        {isLoading && <div className="spinner"></div>}
      </div>
    </div>
  );
};

export default FormPage;
