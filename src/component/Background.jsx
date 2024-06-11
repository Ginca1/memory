import React, { useState, useEffect } from 'react';
import '../css/Background.css';
import Cards from './Cards';

function Background({ onColorChange }) {
  const [backgroundColor, setBackgroundColor] = useState(() => {
    return localStorage.getItem('backgroundColor') || '#34598d';
  });

  const [selectedLevel, setSelectedLevel] = useState(1); 

  useEffect(() => {
    localStorage.setItem('backgroundColor', backgroundColor);
    onColorChange(backgroundColor);
  }, [backgroundColor, onColorChange]);

  const handleColorChange = (color) => {
    setBackgroundColor(color);
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

 
  const getLevelBoxColor = (level) => {
    if (level >= 1 && level <= 7) {
      return 'green';
    } else if (level >= 8 && level <= 14) {
      return 'yellow';
    } else {
      return 'red';
    }
  };

  const colors = ['#34598d', '#0049B7', '#8d2541', '#8458B3'];

  return (
    <>
      <div className="row">
        <div className="background-color-selector">
          <div className="row">
            <div className="color-box">
              <div style={{ height: '100%', justifyContent: 'space-evenly' }} className="row">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="color-option"
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="level-box">
            <div className="row">
              <h2 style={{ color: "whitesmoke" ,cursor:'auto'}} >Choose level</h2>
            </div>

            <div className="row-b1">
              {Array.from({ length: 20 }, (_, i) => i + 1).map((level) => (
                <div
                  key={level}
                  className={`lev-box ${selectedLevel === level ? 'selected' : ''}`}
                  onClick={() => handleLevelSelect(level)}
                  style={{ backgroundColor: getLevelBoxColor(level) }}
                >
                  <div className="row100">
                    <p className='lev'>{level}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Cards selectedLevel={selectedLevel} />
    </>
  );
}

export default Background;
