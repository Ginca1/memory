import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../css/App.css';

function Login() {
  
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccess('');
  
    try {
      console.log('Login data to be sent:', loginData);
  
      const response = await fetch('http://localhost/spele/php/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(loginData),
      });
  
      console.log('Full response from server:', response);
  
      if (!response.ok) {
        throw new Error('Failed to log in');
      }
  
      const data = await response.json();
      console.log('Response from server:', data);
  
      if (data.success) {
       
        sessionStorage.setItem('user_id', data.userID);
        sessionStorage.setItem('username', data.username);
  
        console.log('User ID stored:', data.userID);
        console.log('Username stored:', data.username);
  
       
        navigate('/'); 
      } else {
        setLoginError(data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginError('Error during login. Please try again.');
    }
  };

  return (
    <div className="main">
      <div className="row-r">
        <Link to="/">
          <button className='signup-button'>Back</button>
        </Link>
      </div>
     
      <div style={{marginTop:'2%'}} className="row">
        <form className="modern-form" onSubmit={handleLoginSubmit}> 
        <div className="row">
          <div className="login">
            
            <div className="row">
              <div className="login-info">
              <div className="row-l5">
              <h2>Login</h2>
            </div>
          <div className="row-l5">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={loginData.email} 
              onChange={handleLoginChange}
            />
          </div>
          <div className="row-l">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleLoginChange} 
            />
          </div>
          <div className="form-group">
            {loginError && <p className="error-message">{loginError}</p>} 
            <Link to="/register">
              <p style={{ cursor: 'pointer', color:'blue' }} >
                Don't have an account? Sign up
              </p>
            </Link>
          </div>
          <div className="row5">
          <button type="submit" className="btn-login">Login</button>
          </div>
          </div>
          </div>
          
          </div>
          <div className="side2">
            <div style={{height:'100%'}} className="row">
              <img src="https://static.vecteezy.com/system/resources/thumbnails/021/666/130/small/login-and-password-concept-3d-illustration-computer-and-account-login-and-password-form-page-on-screen-sign-in-to-account-user-authorization-login-authentication-page-concept-png.png" ></img>
            </div>
          </div>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default Login;
