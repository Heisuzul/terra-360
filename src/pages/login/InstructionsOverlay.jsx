import React, { useState } from 'react';
import './InstructionsOverlay.css';

const InstructionsOverlay = ({ onHide }) => {

  return (
    <div className="instructions-overlay">
      <div className="instructions-card">
        <button 
          className="close-button"
          onClick={onHide}
        >
          ✕
        </button>
        
        <h3 className="instructions-title">How to solve the Quiz</h3>
        
        <ul className="instructions-list">
          <li>➡️ <strong>Navigate:</strong> By pressing in the Next/Back buttons and tapping/clicking</li>
          <li>📝 <strong>Interact:</strong> Respond the questions as you like, but your points will be according to that.</li>
          <li>📊 <strong>Track your points:</strong> The points will be updated once you move through the questions</li>
          <li>💾 <strong>Save your points:</strong> Once you finish the quiz, you can save your points, they will be updated on your account!</li>
          <li>🎉 <strong>Enjoy:</strong> Have fun and learn about the saving the earth!</li>
        </ul>
      </div>
    </div>
  );
};

export default InstructionsOverlay;
