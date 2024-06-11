import React, { useState } from 'react';
import '../css/App.css';



const Font = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState(null);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const saveFont = async (e) => {
    e.preventDefault();
    try {
      if (selectedImage) {
        
        const userID = sessionStorage.getItem('user_id');

        
        const response = await fetch('http://localhost/spele/php/save_font.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userID, font: selectedImage }),
        });

        if (response.ok) {
          setMessage('Font updated successfully!');
        } else {
          setMessage('Failed to update font.');
        }
      } else {
        setMessage('No image selected.');
      }
    } catch (error) {
      setMessage('Error saving font: ' + error.message);
    }
  };

  return (
    <div>
      <div className="row2">
        <h2>Choose game font</h2>
        
      </div>

      <div className="row2">
        <div className="image-container">
          <img
            className={selectedImage === 'https://media.timeout.com/images/106041640/image.jpg' ? 'image-item selected' : 'image-item'}
            src='https://media.timeout.com/images/106041640/image.jpg'
            onClick={() => handleImageClick('https://media.timeout.com/images/106041640/image.jpg')}
            alt="Image 1"
          />
          <img
            className={selectedImage === 'https://i.insider.com/5ad8fe2042e1cc60f93d43ae?width=750&format=jpeg&auto=webp' ? 'image-item selected' : 'image-item'}
            src='https://i.insider.com/5ad8fe2042e1cc60f93d43ae?width=750&format=jpeg&auto=webp'
            onClick={() => handleImageClick('https://i.insider.com/5ad8fe2042e1cc60f93d43ae?width=750&format=jpeg&auto=webp')}
            alt="Image 2"
          />
          <img
            className={selectedImage === 'https://cdn.mos.cms.futurecdn.net/xaycNDmeyxpHDrPqU6LmaD.jpg' ? 'image-item selected' : 'image-item'}
            src='https://cdn.mos.cms.futurecdn.net/xaycNDmeyxpHDrPqU6LmaD.jpg'
            onClick={() => handleImageClick('https://cdn.mos.cms.futurecdn.net/xaycNDmeyxpHDrPqU6LmaD.jpg')}
            alt="Image 3"
          />
          <img
            className={selectedImage === 'https://lp-cms-production.imgix.net/2023-03/latvia-GettyImages-516021467-rfc.jpeg' ? 'image-item selected' : 'image-item'}
            src='https://lp-cms-production.imgix.net/2023-03/latvia-GettyImages-516021467-rfc.jpeg'
            onClick={() => handleImageClick('https://lp-cms-production.imgix.net/2023-03/latvia-GettyImages-516021467-rfc.jpeg')}
            alt="Image 4"
          />
        </div>
      </div>
      <div className="row">
        
        {message && <h4 style={{color:"green"}}>{message}</h4>}
      </div>

      <div className="row2">
        <button onClick={saveFont} className="start-button">Save Font</button>
      </div>
    </div>
  );
}

export default Font;
