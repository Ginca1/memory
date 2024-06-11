import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from './component/Header.jsx';
import Background from './component/Background.jsx';
import './css/App.css';

function App() {
  const [selectedColor, setSelectedColor] = useState('hsl(215, 46%, 38%)');

  const handleColorChange = (color) => {
    setSelectedColor(color);
    document.body.style.backgroundColor = color;
  };

  return (
    <div className="main" >
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </Helmet>
      <Header />
      <Background onColorChange={handleColorChange} />
    </div>
  );
}

export default App;
