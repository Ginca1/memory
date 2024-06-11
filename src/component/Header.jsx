import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../css/Header.css'; 

const Header = () => {
  const navigate = useNavigate();
  
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch('http://localhost/spele/php/check_auth.php', {
          method: 'GET',
          credentials: 'include',
        });
    
        const data = await response.json();
    
        console.log('Authentication check response:', data);
    
        if (response.ok && data.success) {
          setAuthenticated(true);
          setUsername(data.username);
  
          if (data.userID !== undefined && data.userID !== null) {
            setUserID(data.userID);
            sessionStorage.setItem('user_id', data.userID); 
          } else {
            console.error('User ID is undefined or null:', data);
          }
  
          sessionStorage.setItem('username', data.username); 
    
          
          const isAdminUser = data.role === 'admin';
          sessionStorage.setItem('role', isAdminUser ? 'admin' : 'user');
        } else {
          setAuthenticated(false);
          setUsername('');
          setUserID(null);
          sessionStorage.removeItem('username'); 
          sessionStorage.removeItem('user_id'); 
          sessionStorage.removeItem('role'); 
        }
      } catch (error) {
        console.error('Error during authentication check:', error);
      }
    };
    
    checkAuthentication();
  
    
    
  }, [username, userID]);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost/spele/php/logout.php', {
        method: 'GET',
        credentials: 'include',
      });
  
      setAuthenticated(false);
      setUsername('');
      setUserID(null);
      sessionStorage.removeItem('username'); 
      sessionStorage.removeItem('user_id'); 
      sessionStorage.removeItem('role'); 
      localStorage.removeItem('backgroundColor')
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  

  return (
    <div className="row-r">
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </Helmet>
      {authenticated ? (
         <div className="toms">
         <div className="row-e">
          
         <div className="username1">Welcome! </div>
        <div className="dropdown">
           
                <div className="username">{username}</div>
          
                <div className="dropdown-content">
                <Link to="/" className='head'>Game
                </Link>
                <Link to="/profile" className='head'>Profile
                </Link>
              </div>
                </div>
               
                <button className='login-button' onClick={handleLogout}>Log out</button>
            </div>
          
        </div>
      ) : (
       
        <>
        <div className="toms">
          <div className="row-r">
          <Link to="/register">
            <button className='signup-button'>Sign up</button>
          </Link>
          <Link to="/login">
            <button className='login-button'>Log in</button>
          </Link>
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
