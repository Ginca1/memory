import React, { useState } from 'react';
import '../css/Edit.css';

function Edit({ onClose }) {
  const [newUsername, setNewUsername] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userID = sessionStorage.getItem('user_id');
  
    if (!userID) {
      setError('User ID not found.');
      return;
    }
  
    if (!newUsername.trim() && !newProfilePicture) {
      setError('Please enter a new username or select a profile picture.');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('userID', userID);
      formData.append('newUsername', newUsername);
      if (newProfilePicture) {
        formData.append('newProfilePicture', newProfilePicture);
      }
  
      const response = await fetch('http://localhost/spele/php/profile.php', {
        method: 'POST',
        body: formData,
      });
  
      const responseData = await response.json();
      if (response.ok) {
        setSuccessMessage('Profile updated successfully!');
        onClose();
      } else {
        setError(responseData.message || 'Failed to update profile.');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      setError('Failed to save changes. Please try again.');
    }
  };

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
    setError('');
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setNewProfilePicture(file);
    setPreviewImage(URL.createObjectURL(file));
    setError('');
  };


  return (
    <div className="row5">
    <div className="edit-container">
      <div className="edit-header">
        <h2>Edit Profile</h2>
        
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row-l">
          <label htmlFor="newUsername">New Username</label>
          <input
            type="text"
            id="newUsername"
            placeholder="Update username (optional)"
            value={newUsername}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="row-l10">
          <label htmlFor="newProfilePicture" className="custom-file-input">
            Change Profile Picture
            <input
              type="file"
              id="newProfilePicture"
              accept="image/*"
              className="file-input"
              onChange={handleProfilePictureChange}
            />
          </label>
        </div>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {previewImage && (
          <div className="row">
            <img className="preview" src={previewImage} alt="Profile Preview" />
          </div>
        )}
        <div className="row-b5">
          <button type="submit" className="submit-button">Save Changes</button>
          <button className="cancel-button" onClick={onClose}>Close</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Edit;
