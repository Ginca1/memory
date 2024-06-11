import React from 'react';
import '../css/App.css';


function TimeOutModal({ reloadPage }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2> Your time ran out!</h2>
        <div className="row">
        <h2>  Try again.</h2>
        </div>
        <div className="row5">
        <button onClick={reloadPage}>OK</button>
        </div>
        
      </div>
    </div>
  );
}

export default TimeOutModal;