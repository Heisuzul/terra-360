import React, { useState } from 'react';  // Importing React and useState hook
import styles from './instructions.module.css';  // Importing CSS module for styling

/**
 * Instructions component displays the navigation instructions to the user.
 * It also allows the user to choose to hide the instructions on subsequent visits using localStorage.
 * 
 * Props:
 * - onHide (function): A callback function that hides the instructions when triggered.
 */
const Instructions = ({ onHide }) => {
  // State that tracks whether the instructions should be hidden
  // It checks localStorage to see if the user previously chose to hide the instructions
  const [hideInstructions, setHideInstructions] = useState(localStorage.getItem('hideInstructions') === 'true');

  /**
   * Handles the change of the checkbox input for hiding the instructions.
   * When the user checks/unchecks the checkbox, it updates the state and also updates localStorage.
   * 
   * @param {Object} e - The event object from the checkbox input change.
   */
  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;  // Get the new checked state of the checkbox
    setHideInstructions(checked);  // Update the state to reflect whether the instructions should be hidden

    if (checked) {
      // If checked, store in localStorage that the user has chosen to hide instructions
      localStorage.setItem('hideInstructions', 'true');
    } else {
      // If unchecked, remove the stored preference from localStorage
      localStorage.removeItem('hideInstructions');
    }

    // Optional: If you want to immediately hide the instructions when the checkbox is clicked,
    // you can trigger the onHide function here.
    // onHide(); // Uncomment this line if you want to hide instructions immediately on checkbox change
  };

  return (
    <div className={styles['instructions']}>  {/* Container for the instructions */}
      <div className={styles['instructions-card']}>  {/* Card to display instructions content */}
        
        {/* Close button to hide the instructions when clicked */}
        <button 
          className={styles['close-button']}  // Styling for the close button
          onClick={onHide}  // Calls the onHide function passed via props
        >
          ✕  {/* Close icon (cross) */}
        </button>
        
        {/* Title for the instructions */}
        <h3 className={styles['instructions-title']}>How to Navigate</h3>
        
        {/* List of navigation instructions */}
        <ul className={styles['instructions-list']}>
          <li>🔎 <strong>Navigation:</strong> Scroll wheel 🖱️</li>  {/* Scroll navigation */}
          <li>🧭 <strong>Navigation:</strong> Use the arrow keys ⌨️ </li>  {/* Arrow key navigation */}
          <li>🔇 <strong>Mute/Unmute sounds:</strong> Press M key</li>  {/* Mute/unmute sound */}
        </ul>
        
      </div>
    </div>
  );
};

export default Instructions;  // Exporting the Instructions component

