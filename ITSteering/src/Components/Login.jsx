import React, { useState, useEffect } from 'react';
import axios from 'axios'

const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/getUsers')
    .then(users => setUsers(users.data))
    .catch(err => console.log(err));

  }, [])


  const handleLogin = () => {
    // Your login logic goes here
    // For simplicity, assume successful login if username and password are not empty
    users.forEach(user => {
      if(username === user.username && password === user.password) {
        onLoginSuccess(username);

      } else {
        setError('Please enter a valid username and password');
      }
    })

  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
