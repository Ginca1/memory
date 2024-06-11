import React, { useState } from 'react';
import '../css/ChangePass.css'; 

function ChangePass({ onClose }) {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();

   

    if (!/\S+@\S+\.\S+/.test(email.trim())) {
      setError('Invalid email format.');
      return;
    }
    if (currentPassword.trim().length == 0 ) {
      setError('Enter password');
      return;
    }
    if (currentPassword.trim().length < 9) {
      setError(' Current password must be at least 9 characters long.');
      return;
    }
    if (newPassword.trim().length < 9) {
      setError('New password must be at least 9 characters long.');
      return;
    }

    if (newPassword.trim() !== confirmPassword.trim()) {
      setError('New password and confirm password do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost/spele/php/change_pass.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email.trim(),
          currentPassword: currentPassword.trim(),
          newPassword: newPassword.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage('Password changed successfully!');
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setError(data.message || 'Failed to change password.');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setError('Error changing password. Please try again.');
    }
  };

  return (
    <div className="change-password-container">
      <div className="row">
        <h2 style={{cursor:"auto"}}>Change password</h2>
      </div>
      <div className="row">
      {error && !successMessage && <h4 className="error">{error}</h4>}
        {successMessage && <h4 className="success">{successMessage}</h4>}
      </div>
      <form onSubmit={handleChangePassword} className="change-password-form">
        <div className="row-l">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="email-input"
          />
        </div>
        <div className="row-l">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            className="password-input"
          />
        </div>
        <div className="row-l">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="password-input"
          />
        </div>
        <div className="row-l">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="password-input"
          />
        </div>
        <div className="row5">
        <div className="button-group">
          <button type="submit" className="submit-button">Change Password</button>
          <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
        </div>
        </div>
      </form>
    </div>
  );
}

export default ChangePass;
