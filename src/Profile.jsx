import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Header from './component/Header.jsx';
import ChangePass from './component/ChangePass.jsx';
import History from './component/History.jsx'; 
import Font from './component/Font.jsx';
import Leaderboard from './component/Leaderboard.jsx';
import Edit from './component/Edit.jsx'; 
import './css/App.css';

function Profile() {
  const navigate = useNavigate(); 
  const [username, setUsername] = useState('');
  const [showChangePass, setShowChangePass] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showFont, setShowFont] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch('http://localhost/spele/php/check_auth.php', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setUsername(data.username);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, [navigate]); 

  const handlePassClick = () => {
    setShowChangePass(true);
    setShowHistory(false);
    setShowFont(false);
    setShowLeaderboard(false);
    setShowEdit(false);
  };

  const handleCloseChangePass = () => {
    setShowChangePass(false);
  };

  const handleEditClick = () => { 
    setShowEdit(true); 
    setShowHistory(false);
    setShowFont(false);
    setShowLeaderboard(false);
    setShowChangePass(false);
  };

  const handleCloseEdit = () => { 
    setShowEdit(false);
  };

  const handleHistoryClick = () => {
    setShowHistory(true);
    setShowFont(false);
    setShowChangePass(false);
    setShowLeaderboard(false);
    setShowEdit(false);
  };

  const handleCloseHistory = () => {
    setShowHistory(false);
  };

  const handleFontClick = () => {
    setShowFont(true);
    setShowChangePass(false);
    setShowHistory(false);
    setShowLeaderboard(false);
    setShowEdit(false);
  };

  const handleCloseFont = () => {
    setShowFont(false);
  };

  const handleLeaderboardClick = () => {
    setShowLeaderboard(true);
    setShowChangePass(false);
    setShowHistory(false);
    setShowFont(false);
    setShowEdit(false);
  };

  const handleCloseLeaderboard = () => {
    setShowLeaderboard(false);
  };

  return (
    <div className="main">
      <Header username={username} />
      
      <div className="row2">
        <div className="profile">
          <div className="row-b">
            <div className="user">
              <div className="row2">
                <div className="circle">
                  <div className="row">                 
                    <img className='bilde' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNzXYh-X4wxX1jfbPywa8HWoNGDnx1Tlo0-g&s" alt="Profile Picture" />
                  </div>
                </div>
              </div>
              <div className="row">
                <h1 style={{ color: "black" }}>{username}</h1>
              </div>
              <div className="row">
                <div className='pass' onClick={handleEditClick}>Edit Profile</div> 
              </div>
              <div className="row">
                <div className='pass' onClick={handlePassClick}>Change password</div>
              </div>
              
              <div className="row10">
                <div className="apak">
                  <div className="row-l">
                    <h3 onClick={handleHistoryClick}>Game history</h3>
                  </div>
                  <div className="row-l">
                    <h3 onClick={handleFontClick}>Change background</h3>
                  </div>
                  <div className="row-l">
                    <h3 onClick={handleLeaderboardClick}>Leaderboard</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="info">
              <div className="row2">
                <h1 className='balts'>Welcome to Profile!</h1>
              </div>
              
              {showChangePass && <ChangePass onClose={handleCloseChangePass} />}
              {showEdit && <Edit onClose={handleCloseEdit} />} 
              {showHistory && <History onClose={handleCloseHistory} />}
              {showFont && <Font onClose={handleCloseFont} />}
              {showLeaderboard && <Leaderboard onClose={handleCloseLeaderboard} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
