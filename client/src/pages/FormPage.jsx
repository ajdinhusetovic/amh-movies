import { useState } from 'react';
import axios from 'axios';

const FormPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/api/v1/users/register', {
        username,
        password,
        passwordConfirm,
      });
      alert('Registration completed');
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/api/v1/users/login', {
        username,
        password,
      });

      alert('Succesfully logged in');
      console.log(res.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="register">
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
          <button type="submit">Create account</button>
        </form>
      </div>
      <div className="login">
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
          <button type="submit">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
