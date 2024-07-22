import React, { useState } from 'react';
import Home from './components/Home';
import Game from './components/Game';

const App = () => {
  const [playerName, setPlayerName] = useState('');
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleStartGame = (name) => {
    setPlayerName(name);
    setIsGameStarted(true);
  };

  const handleExitGame = () => {
    setIsGameStarted(false);
  };

  return (
    <div className="min-h-screen">
      {isGameStarted ? (
        <Game playerName={playerName} onExit={handleExitGame} />
      ) : (
        <Home onStartGame={handleStartGame} />
      )}
    </div>
  );
};

export default App;
