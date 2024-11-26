import React, { useState } from 'react';
import styles from './instructions.module.css';  

const Instructions = ({ onHide }) => {
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
    <div className={styles['instructions']}>
      <div className={styles['instructions-card']}>
        <button 
          className={styles['close-button']}
          onClick={onHide}
        >
          ✕
        </button>
        
        <h3 className={styles['instructions-title']}>How to Navigate</h3>
        
        <ul className={styles['instructions-list']}>
          <li>🔎 <strong>Navigation:</strong> Scroll wheel 🖱️</li>
          <li>🧭 <strong>Navigation:</strong> Use the arrow keys ⌨️ </li>
          <li>🔇 <strong>Mute/Unmute sounds:</strong> Press M key</li>
        </ul>
        
        <label className={styles['checkbox-label']}>
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

export default Instructions; 
