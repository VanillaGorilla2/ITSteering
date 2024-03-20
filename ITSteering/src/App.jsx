import React, { useState } from 'react';
import LoginPage from './Components/Login.jsx';
import ITSteering from './Components/ITSteering.jsx';
import ITSteeringUser from './Components/ITSteeringUser.jsx';
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
      ) : username === 'admin' ? (
        <ITSteering username={username} />
      ) : (
        <ITSteeringUser username={username} />
      )}
    </div>
  );
};

export default App;