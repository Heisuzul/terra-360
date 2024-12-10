import React, { useState } from 'react';
import './InstructionsOverlay.css';

const InstructionsOverlay = ({ onHide }) => {
  const [hideInstructions, setHideInstructions] = useState(localStorage.getItem('hideInstructions') === 'true');

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setHideInstructions(checked);
    if (checked) {
      localStorage.setItem('hideInstructions', 'true');
    } else {
      localStorage.removeItem('hideInstructions');
    }
    // onHide(); // Trigger hide immediately when checkbox changes
  };

  return (
    <div className="instructions-overlay">
      <div className="instructions-card">
        <button 
          className="close-button"
          onClick={onHide}
        >
          ✕
        </button>
        
        <h3 className="instructions-title">How to Navigate</h3>
        
        <ul className="instructions-list">
          <li>🎥 <strong>Rotate:</strong> Left-click and drag</li>
          <li>🔎 <strong>Zoom:</strong> Scroll wheel 🖱️. Click over the objects with the 👆 or Double Click on the ones without it to get closer.</li>
          <li>🧭 <strong>Navigation:</strong> Use the arrow keys ⌨️ or swipe 📲.</li>
          <li>🧱 <strong>Enter/Exit quiz area:</strong> Press ENTER key or double click on platform floor </li>
          <li>🔇 <strong>Mute/Unmute sounds:</strong> Press M key</li>
          <li>↩️ <strong>Reset position:</strong> Press ESC key</li>
        </ul>
        
        <label className="checkbox-label">
          <input 
            type="checkbox" 
            checked={hideInstructions}
            onChange={handleCheckboxChange}
          />
          Don't show again
        </label>
      </div>
    </div>
  );
};

export default InstructionsOverlay;
