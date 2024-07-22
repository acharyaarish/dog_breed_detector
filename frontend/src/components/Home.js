import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notification from './Notification';
import './Home.css';

const Home = ({ onStartGame }) => {
  const [name, setName] = useState('');
  const [highestScorer, setHighestScorer] = useState(null);
  const [notification, setNotification] = useState('');
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [gifIndex, setGifIndex] = useState(0);
  const backgrounds = [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg',
    '6.jpg',
    '7.jpg',
    '8.jpg',
    '9.jpg',
    '10.jpg',
    '11.jpg',
    '12.jpg',
    '13.jpg',
  ];
  const gifs = [
    '/gif/1.gif',
    '/gif/2.gif',
    '/gif/3.gif',
    '/gif/4.gif',
    '/gif/5.gif',
  ];

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:5000/leaderboard');
        const highest = response.data.leaderboard[0];
        setHighestScorer(highest);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    const backgroundInterval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 15000); // Change background every 15 seconds

    return () => clearInterval(backgroundInterval);
  }, [backgrounds.length]);

  useEffect(() => {
    const gifInterval = setInterval(() => {
      setGifIndex((prevIndex) => (prevIndex + 1) % gifs.length);
    }, 5000); // Change gif every 5 seconds

    return () => clearInterval(gifInterval);
  }, [gifs.length]);

  const handleStartGame = () => {
    if (name.trim()) {
      onStartGame(name.trim());
    } else {
      setNotification('Please enter your name');
      setTimeout(() => {
        setNotification('');
      }, 3000);
    }
  };

  const currentBackground = `/img/${backgrounds[backgroundIndex]}`;
  const currentGif = gifs[gifIndex];

  return (
    <div className="home-container relative flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${currentBackground})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="z-10 w-full max-w-5xl px-8 py-10 text-center bg-white bg-opacity-90 rounded-lg shadow-lg flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full lg:w-1/2 text-left space-y-8 mb-8 lg:mb-0">
          <h1 className="text-5xl font-extrabold text-gray-900 animate-pulse">
            Dog Breed Detector
          </h1>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-6 py-4 text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300 text-gray-900"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="w-full py-4 text-xl font-bold text-white bg-yellow-500 rounded-lg hover:bg-yellow-700 transition duration-300 transform hover:scale-105"
            onClick={handleStartGame}
          >
            Start Game
          </button>
          {highestScorer && (
            <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg transition duration-300 transform hover:scale-105 text-center">
              <h2 className="text-2xl font-bold">Highest Scorer</h2>
              <p className="text-lg">{highestScorer.user_name}: {highestScorer.score}</p>
            </div>
          )}
          {notification && <Notification message={notification} />}
        </div>
        <div className="w-full lg:w-1/2 flex justify-center">
          <img src={currentGif} alt="animated-gif" className="w-48 h-48 lg:w-64 lg:h-64 rounded-lg shadow-lg transition duration-300 transform hover:scale-110" />
        </div>
      </div>
    </div>
  );
};

export default Home;
