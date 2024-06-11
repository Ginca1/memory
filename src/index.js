import React from 'react';
import { createRoot } from 'react-dom'; // Corrected import
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Register from './component/Register';
import Login from './component/Login';
import Profile from './Profile';

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<App />} />
    </Routes>
  </Router>
);
