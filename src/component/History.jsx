import React, { useState, useEffect } from 'react';
import '../css/App.css'; 

function History({ onClose }) {
  const [gameHistory, setGameHistory] = useState([]);

  useEffect(() => {
    const fetchGameHistory = async () => {
      try {
        const response = await fetch('http://localhost/spele/php/game_history.php', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setGameHistory(data.gameHistory);
        } else {
          console.error('Failed to fetch game history:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching game history:', error);
      }
    };

    fetchGameHistory();
  }, []);

  return (
    <div className="history-container">
      <div className="header">
        <h2>Game History</h2>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
      <div className="history-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {gameHistory.length === 0 ? (
          <p className="no-history">No game history available</p>
        ) : (
          gameHistory
            .slice()
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((game, index) => (
              <div key={index} className="history-item">
                <div className="info1">
                <p><span className="label">Level Completed:</span> {game.level_completed}</p> 
                  <p><span className="label">Date:</span> {game.date}</p>
                  <p><span className="label">Time:</span> {game.time}</p>
                  <p><span className="label">Score:</span> {game.score}</p>
                  <p><span className="label">Username:</span> {game.username}</p>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default History;
