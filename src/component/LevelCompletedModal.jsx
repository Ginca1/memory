import React from 'react';
import '../css/LevelComplete.css'; 

function LevelCompletedModal({ nextLevel, closeModal, time, score, completedLevel }) {
  const handleOkClick = () => {
    closeModal();
    nextLevel();
  };

  
  const calculateStars = () => {
    const timeInSeconds = timeToSeconds(time);
    if (timeInSeconds >= 18) {
      return '⭐⭐⭐';
    } else if (timeInSeconds >= 10) {
      return '⭐⭐';
    } else {
      return '⭐';
    }
  };

 
  const timeToSeconds = (time) => {
    const [minutes, seconds] = time.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Level Completed!</h2>
        <div className="modal-info">
          <p>Level: {completedLevel}</p>
          <p>Time: {time}</p>
          <p>Score: {score}</p>
          <div className="row">
          <p>{calculateStars()}</p>
          </div>
         
        </div>
        <div className="modal-actions">
          <button onClick={handleOkClick}>OK</button>
        </div>
      </div>
    </div>
  );
}

export default LevelCompletedModal;
