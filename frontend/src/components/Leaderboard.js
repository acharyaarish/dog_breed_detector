import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('http://localhost:5000/leaderboard');
      setLeaderboard(response.data.leaderboard);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Leaderboard</h2>
      <ul className="list-disc pl-5">
        {leaderboard.map((entry, index) => (
          <li key={index}>{`${entry.user_name}: ${entry.score}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
