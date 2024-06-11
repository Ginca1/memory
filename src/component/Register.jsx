import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../css/App.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    
    if (formData.username.length < 3 || formData.username.length > 10) {
      setErrorMessage('Username must be between 3 and 10 characters.');
      return;
    }
  
    if (!validateEmail(formData.email)) {
      setErrorMessage('Invalid email format.');
      return;
    }
  
    if (formData.password.length < 9) {
      setErrorMessage('Password must be at least 9 characters long.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost/spele/php/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      if (data.success) {
        setSuccessMessage(data.message);
        
        setErrorMessage('');
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      console.error('Error:', error);
    }
  };

  const validateEmail = (email) => {
    
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="main">
      <div className="row-r">
        <Link to="/">
          <button className='signup-button'>Back</button>
        </Link>
      </div>
      
      <div className="row2">
        <form className="modern-form" onSubmit={handleSubmit}>
          <div style={{ height: '100%' }} className="row">

          
          <div className="signup">
            <div className="row">
          <div className="signup-info">
            <div  className="row-l5">
              <h2 >Register</h2>
            </div>
            <div className="row-l">
          
            <div className="row-l">
            <label htmlFor="username">Username</label>
            </div>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              placeholder="Enter username!"
              value={formData.username}
              onChange={handleChange}
            />
          
          </div>
          <div className="row-l">
         
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter email!"
              value={formData.email}
              onChange={handleChange}
            />
          
          </div>
          <div className="row-l">
          
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter password!"
              value={formData.password}
              onChange={handleChange}
            />
          
          </div>
          <div className="form-group">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <Link to="/login">
              <p style={{ cursor: 'pointer', color: 'blue', marginTop:'10px' }} >
                Already have an account? Log in
              </p>
            </Link>
          </div>
          <div className="row5">
          <button type="submit" className="btn-signup">Sign Up</button>
          </div>
          </div>
          </div>
          
          </div>
          <div className="side">
              <div style={{height:'100%'}} className="row">
                <img className='signup-image' src="https://cdni.iconscout.com/illustration/free/thumb/free-sign-up-form-4575543-3798675.png" ></img>
              </div>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
