import React, { useState, useEffect } from 'react';
import styles from './mute-button.module.css';

const MuteButton = ({ onMuteToggle }) => {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted((prevState) => {
      const newMuteState = !prevState;
      console.log('Mute cambiado a:', newMuteState);
      onMuteToggle(newMuteState);
      return newMuteState;
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === 'm') {
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); 

  return (
    <div className={styles.muteButtonContainer}>
      <button className={styles.muteButton} onClick={toggleMute}>
        {isMuted ? '🔇' : '🔊'}
      </button>
    </div>
  );
};

export default MuteButton;