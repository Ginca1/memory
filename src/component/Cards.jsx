import React, { useState, useEffect } from 'react';
import TimeOutModal from './TimeOutModal'; 
import Level2 from './level/Level2';
import Level3 from './level/Level3';
import Level4 from './level/Level4';
import Level5 from './level/Level5';
import Level6 from './level/Level6';
import Level7 from './level/Level7';
import Level8 from './level/Level8';
import Level9 from './level/Level9';
import Level10 from './level/Level10';
import Level11 from './level/Level11';
import Level12 from './level/Level12';
import Level13 from './level/Level13';
import Level14 from './level/Level14';
import Level15 from './level/Level15';
import Level16 from './level/Level16';
import Level17 from './level/Level17';
import Level18 from './level/Level18';
import Level19 from './level/Level19';
import Level20 from './level/Level20';
import LevelCompletedModal from './LevelCompletedModal';

function Cards({ selectedLevel }) {
  const [font, setFont] = useState('');
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [allCardsMatched, setAllCardsMatched] = useState(false);
  const [timerInterval, setTimerInterval] = useState(null);
  

  useEffect(() => {
    const fetchFontImage = async () => {
      try {
        const userID = sessionStorage.getItem('user_id');
        const response = await fetch(`http://localhost/spele/php/get_user.php?id=${userID}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const userData = await response.json();
          const userFont = userData.font;
          setFont(userFont);
        } else {
          console.error('Failed to fetch user data.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchFontImage();
  }, []);

  useEffect(() => {
    const symbols = ['./img/book.webp', './img/dimants.webp'];
    const initialCards = [];
    symbols.forEach(symbol => {
      for (let i = 0; i < 3; i++) {
        initialCards.push({ imageUrl: symbol, id: initialCards.length }); 
      }
    });
    initialCards.sort(() => Math.random() - 0.5);
    setCards(initialCards);
  }, []);

  useEffect(() => {
    if (gameStarted && time === 0) {
      setActiveModal('timeout');
      clearInterval(timerInterval);
    }
  }, [time]);

  const handleCardClick = (index) => {
  
    if (!gameStarted || flippedIndices.includes(index) || matchedIndices.includes(index) || flippedIndices.length >= 3) return;
  
    setFlippedIndices([...flippedIndices, index]);
  
    if (flippedIndices.length === 2) {
      const isMatch = flippedIndices.every(i => cards[i].imageUrl === cards[index].imageUrl); 
      if (isMatch) {
        setMatchedIndices([...matchedIndices, ...flippedIndices, index]);
        setScore(score + 1);
      }
      setTimeout(() => setFlippedIndices([]), 1000);
    }
  };


  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
  
  const startTimer = () => {
    setGameStarted(true);
    const intervalId = setInterval(() => {
      setTime(prevTime => {
        if (prevTime === 0) {
          clearInterval(intervalId);
          setActiveModal('timeout');
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    setTimerInterval(intervalId);
  };

  const cleanupTimer = () => {
    clearInterval(timerInterval);
  };

  const reloadPage = () => {
    window.location.reload(); 
  };

  useEffect(() => {
    const allMatchesFound = () => {
      const symbolCounts = {};
      matchedIndices.forEach(index => {
        const symbol = cards[index].imageUrl;
        symbolCounts[symbol] = (symbolCounts[symbol] || 0) + 1;
      });
      return Object.values(symbolCounts).every(count => count === 3);
    };
  
    if (gameStarted && matchedIndices.length === cards.length) { 
      setAllCardsMatched(true);
      if (allMatchesFound()) {
        handleGameCompletion();
        clearInterval(timerInterval);
      }
    }
  }, [matchedIndices]);

  const handleGameCompletion = async () => {
    try {
      const userID = sessionStorage.getItem('user_id');
      const currentDate = new Date();
      const dateString = currentDate.toISOString();
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      const timeString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      const response = await fetch('http://localhost/spele/php/save_game.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          score,
          userID,
          date: dateString,
          time: timeString,
          level_completed: selectedLevel, 
        }),
      });
  
      if (!response.ok) {
        console.error('Failed to save game data.');
      }
    } catch (error) {
      console.error('Error saving game data:', error);
    }
  
    setActiveModal('levelCompleted');
  };

  const closeModal = () => {
    setActiveModal(null); 
  };

  const nextLevel = () => {
    window.location.reload(); 
  };

  return (
    <div className="row">
      
      {selectedLevel === 2 && (
        <Level2 selectedLevel={selectedLevel} />
      )}
       {selectedLevel === 3 && (
        <Level3 selectedLevel={selectedLevel} />
      )}
       {selectedLevel === 4 && (
        <Level4 selectedLevel={selectedLevel} />
      )}
       {selectedLevel === 5 && (
        <Level5 selectedLevel={selectedLevel} />
      )}
      {selectedLevel === 6 && (
        <Level6 selectedLevel={selectedLevel} />
      )}
      {selectedLevel === 7 && (
        <Level7 selectedLevel={selectedLevel} />
      )}
      {selectedLevel === 8 && (
        <Level8 selectedLevel={selectedLevel} />
      )}
       {selectedLevel === 9 && (
        <Level9 selectedLevel={selectedLevel} />
      )}
      {selectedLevel === 10 && (
        <Level10 selectedLevel={selectedLevel} />
      )}
      {selectedLevel === 11 && (
        <Level11 selectedLevel={selectedLevel} />
      )}
      {selectedLevel === 12 && (
        <Level12 selectedLevel={selectedLevel} />
      )}
       {selectedLevel === 13 && (
        <Level13 selectedLevel={selectedLevel} />
      )}
       {selectedLevel === 14 && (
        <Level14 selectedLevel={selectedLevel} />
      )}
      {selectedLevel === 15 && (
        <Level15 selectedLevel={selectedLevel} />
      )}
      {selectedLevel === 16 && (
        <Level16 selectedLevel={selectedLevel} />
      )}
      {selectedLevel === 17 && (
        <Level17 selectedLevel={selectedLevel} />
      )}
       {selectedLevel === 18 && (
        <Level18 selectedLevel={selectedLevel} />
      )}
       {selectedLevel === 19 && (
        <Level19 selectedLevel={selectedLevel} />
      )}
       {selectedLevel === 20 && (
        <Level20 selectedLevel={selectedLevel} />
      )}
      {selectedLevel !== 2 && selectedLevel !== 3 && selectedLevel !== 4 && selectedLevel !== 5 && selectedLevel !== 6 && selectedLevel !== 7 && selectedLevel !== 8 &&
      selectedLevel !== 9 && selectedLevel !== 10 && selectedLevel !== 11 && selectedLevel !== 12 && selectedLevel !== 13 && selectedLevel !== 14 &&
      selectedLevel !== 15 && selectedLevel !== 16 && selectedLevel !== 17 && selectedLevel !== 18 && selectedLevel !== 19 && selectedLevel !== 20 &&(
        <div className="game1">
          <div className="row">
            <div className="tgp">
              <div className="row-b">
                <h1 className='above'>Time: {formatTime(time)}</h1>
                <h1 className='above'>Memory Game</h1>
                <h1 className='above'>Score: {score}</h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="App" style={{ 
              backgroundImage: `url(${font})`, 
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat', 
              backgroundPosition: 'center', 
            }}>
              <div className="row2">
                <div className="card-container">
                  <div className="row">
                    {cards.map((card, index) => (
                      <div
                        key={index}
                        className={`card ${flippedIndices.includes(index) ? 'flipped' : ''} ${matchedIndices.includes(index) ? 'matched' : ''}`}
                        onClick={() => handleCardClick(index)}
                      >
                        {flippedIndices.includes(index) || matchedIndices.includes(index) ? (
                          <img className='atver' src={card.imageUrl} alt={`Card ${index}`} />
                        ) : (
                          <div className="card-back"></div> 
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="row2">
                {!gameStarted && (
                  <button onClick={startTimer} className="start-button">START</button>
                )}
              </div>
            </div>
          </div>
          {activeModal === 'timeout' && <TimeOutModal reloadPage={reloadPage} />}
          {activeModal === 'levelCompleted' && (
            <LevelCompletedModal
              nextLevel={nextLevel}
              closeModal={closeModal}
              time={formatTime(time)}
              completedLevel={selectedLevel} 
              score={score}
              cleanupTimer={cleanupTimer} 
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Cards;
