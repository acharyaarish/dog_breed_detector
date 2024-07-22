import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Notification from './Notification';
import './Game.css';

const Game = ({ playerName, onExit }) => {
  const [breeds, setBreeds] = useState([]);
  const [options, setOptions] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [correctBreed, setCorrectBreed] = useState('');
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchBreeds = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/breeds');
      setBreeds(response.data.breeds);
      fetchRandomDog(response.data.breeds);
    } catch (error) {
      console.error('Error fetching breeds:', error);
    }
  }, []);

  const fetchRandomDog = async (breedsList) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/random_dog');
      const correctBreed = response.data.breed;
      const randomBreeds = [correctBreed, ...breedsList.filter(b => b !== correctBreed).sort(() => 0.5 - Math.random()).slice(0, 3)];
      setImageUrl(response.data.image_url);
      setCorrectBreed(correctBreed);
      setOptions(randomBreeds.sort(() => 0.5 - Math.random()));
    } catch (error) {
      console.error('Error fetching random dog:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitScore = useCallback(async () => {
    try {
      await axios.post('http://localhost:5000/submit_score', { user_name: playerName, score });
      console.log('Score submitted successfully!');
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  }, [playerName, score]);

  useEffect(() => {
    fetchBreeds();
  }, [fetchBreeds]);

  useEffect(() => {
    return () => {
      submitScore();
    };
  }, [submitScore]);

  const checkAnswer = (selectedBreed) => {
    if (selectedBreed === correctBreed) {
      setScore(score + 1);
      setMessage(`Correct, ${playerName}!`);
      setTimeout(() => {
        setMessage('');
        fetchRandomDog(breeds);
      }, 1000);
    } else {
      setMessage('Game Over');
      setTimeout(() => {
        setMessage('');
        onExit();
      }, 2000);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 text-white">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="z-10 w-full max-w-3xl px-8 py-10 text-center bg-white bg-opacity-90 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-6 text-gray-900 animate-pulse">Player: {playerName}</h2>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-lg mb-6 hover:bg-red-700 transition duration-300 transform hover:scale-105"
          onClick={onExit}
        >
          Exit Game
        </button>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="spinner-border animate-spin inline-block w-16 h-16 border-8 rounded-full border-t-8 border-t-yellow-400" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 flex justify-center">
              <img src={imageUrl} alt="Random Dog" className="w-64 h-64 object-contain rounded shadow-lg transition duration-300 transform hover:scale-110" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {options.map((breed, index) => (
                <button
                  key={index}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                  onClick={() => checkAnswer(breed)}
                >
                  {breed}
                </button>
              ))}
            </div>
            <p className="mt-8 text-3xl font-semibold text-gray-900">Score: {score}</p>
          </>
        )}
        {message && <Notification message={message} isError={message.includes('Game Over')} />}
      </div>
    </div>
  );
};

export default Game;
