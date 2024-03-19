import React, { useState } from 'react';
import LoginPage from './Components/Login.jsx';
import ITSteering from './Components/ITSteering.jsx';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLoginSuccess = (user) => {
    setUsername(user);
    setIsLoggedIn(true);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <ITSteering username={username} />
      )}
    </div>
  );
};

export default App;