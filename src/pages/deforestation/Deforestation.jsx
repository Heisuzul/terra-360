import React, { useState, useEffect, useRef } from 'react';
import Scene from '../../r3f/deforestation/scenes/Scene';
import InstructionsOverlay from './InstructionsOverlay';
import SolutionsOverlay from './SolutionsOverlay';
import Navbar from './navbar/Navbar';
import './Deforestation.css';

const Deforestation = ({ ready }) => {
  const [showInstructions, setShowInstructions] = useState(() => localStorage.getItem('hideInstructions') !== 'true');
  const lastInteractionRef = useRef(Date.now());
  const timeoutRef = useRef(null);
  const isDraggingRef = useRef(false);
  const [isMuted, setIsMuted] = useState(false);
  const puffedTreesCountRef = useRef(0);
  const [treesShown, setTreesShown] = useState(true);
  const sceneRef = useRef();
  
  
  const updateInstructionsVisibility = () => {
    const hideInstructions = localStorage.getItem('hideInstructions');
    setShowInstructions(hideInstructions !== 'true');
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 't') {
        setShowInstructions(true);
      }
      if (event.key === 'm') {
        setIsMuted((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleLocalStorageChange = () => {
      const hideInstructions = localStorage.getItem('hideInstructions');
      setShowInstructions(hideInstructions !== 'true');
    };

    window.addEventListener('storage', handleLocalStorageChange);

    return () => {
      window.removeEventListener('storage', handleLocalStorageChange);
    };
  }, []);

  useEffect(() => {
    // Function to reset the timeout and show instructions
    const loopInstructions = () => {
      updateInstructionsVisibility(); // Show instructions
    };

    // Loop every 5 seconds
    timeoutRef.current = setInterval(loopInstructions, 5000);

    // Cleanup interval on component unmount
    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, []);

  const handleMute = () => {
    setIsMuted((prev) => !prev);
  };


  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
    {!showInstructions && (
        <div className={'tutorial-buttons'}>
          <button className='mute-button' onClick={handleMute}>{(isMuted? '🔊' : '🔇')}</button>
          <button className='tutorial-button' onClick={() => setShowInstructions(true)}>🎓</button>
        </div>
      )}
      <Navbar pointsRef={puffedTreesCountRef}/>
      <Scene ref={sceneRef} ready={ready} isMuted={isMuted} setPointsRef={puffedTreesCountRef} setTreesShown={setTreesShown} treesShown={treesShown}/>
      
      {showInstructions && (
        <InstructionsOverlay 
          onHide={() => {
            setShowInstructions(false);
            lastInteractionRef.current = Date.now();
          }} 
        />
      )}

      {!treesShown && (
        <SolutionsOverlay onHide={() => {
          if (sceneRef.current) {
            sceneRef.current.handleTreesGrow();
          }
        }} />
      )}
    </div>
  );
};

export default Deforestation;
