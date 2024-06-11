import React, { useState, useEffect } from 'react';
import '../css/Lead.css'; 

function Leaderboard({ onClose }) {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(1);

  useEffect(() => {
    fetchLeaderboardData(selectedLevel);
  }, [selectedLevel]);

  const fetchLeaderboardData = async (level) => {
    try {
      const response = await fetch(`http://localhost/spele/php/leaderboard.php?level=${level}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        const bestTimesPerUser = findBestTimesPerUser(data.leaderboard);
        setLeaderboardData(bestTimesPerUser);
      } else {
        console.error('Failed to fetch leaderboard data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    }
  };

  const findBestTimesPerUser = (leaderboard) => {
    const bestTimesMap = new Map();
    leaderboard.forEach((entry) => {
      const username = entry.username;
      const time = entry.time;
      if (!bestTimesMap.has(username) || time < bestTimesMap.get(username).time) {
        bestTimesMap.set(username, { time });
      }
    });
    return Array.from(bestTimesMap, ([username, { time }]) => ({ username, time }));
  };

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  const getMedal = (index) => {
    switch (index) {
      case 0:
        return '🥇'; 
      case 1:
        return '🥈'; 
      case 2:
        return '🥉'; 
      default:
        return null;
    }
  };

  return (
    <div className="leaderboard-container">
      <div className="header">
        <h2>Leaderboard</h2>
        <div className="row">
          <label style={{ paddingTop: '0px', marginBottom: '0px' }} htmlFor="level">Select Level:</label>
          <select id="level" value={selectedLevel} onChange={handleLevelChange}>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((level) => (
              <option key={level} value={level}>Level {level}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="level-dropdown">
      </div>
      <div className="leaderboard-list">
        {leaderboardData.length === 0 ? (
          <p className="no-leaderboard">No leaderboard data available</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Best Time</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry, index) => (
                <tr key={index}>
                  <td> {index + 1} {getMedal(index)}</td>
                  <td>{entry.username}</td>
                  <td>{entry.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
