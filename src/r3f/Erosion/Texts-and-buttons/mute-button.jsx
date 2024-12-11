import React, { useState, useEffect } from 'react';
import styles from './mute-button.module.css';

/**
 * MuteButton Component
 *
 * This component renders a button that allows users to toggle sound on or off.
 * It also listens for the 'M' key press as an alternative way to toggle mute.
 *
 * Props:
 * - onMuteToggle (function): Callback function triggered whenever the mute state changes.
 * 
 * State:
 * - isMuted (boolean): Indicates whether the audio is muted or unmuted.
 */

const MuteButton = ({ onMuteToggle }) => {
  // State to track whether the audio is muted
  const [isMuted, setIsMuted] = useState(true);

  /**
   * toggleMute
   *
   * This function toggles the mute state between `true` and `false`.
   * It also triggers the `onMuteToggle` callback with the updated state.
   */
  const toggleMute = () => {
    setIsMuted((prevState) => {
      const newMuteState = !prevState; // Toggle mute state
      console.log('Mute toggled to:', newMuteState); // Log new state
      onMuteToggle(newMuteState); // Trigger the callback
      return newMuteState; // Update state
    });
  };

  // Add a keydown event listener for the 'M' key
  useEffect(() => {
    /**
     * handleKeyDown
     *
     * This function listens for the 'M' key press and toggles the mute state.
     * @param {KeyboardEvent} event - The keyboard event triggered on key press.
     */
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === 'm') {
        toggleMute(); // Toggle mute when 'M' is pressed
      }
    };

    // Attach the event listener to the window
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className={styles.muteButtonContainer}>
      {/* Button to toggle mute with visual feedback (icon) */}
      <button className={styles.muteButton} onClick={toggleMute}>
        {isMuted ? '🔇' : '🔊'} {/* Change icon based on mute state */}
      </button>
    </div>
  );
};

export default MuteButton; // Export the MuteButton component for use in other parts of the app
