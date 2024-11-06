import React, { useState, useEffect, useRef } from 'react';
import Scene from '../../r3f/deforestation/scenes/Scene';
import InstructionsOverlay from './InstructionsOverlay';

const Deforestation = ({ ready }) => {
  const [showInstructions, setShowInstructions] = useState(() => localStorage.getItem('hideInstructions') !== 'true');
  const lastInteractionRef = useRef(Date.now());
  const timeoutRef = useRef(null);
  const isDraggingRef = useRef(false);
  
  const updateInstructionsVisibility = () => {
    const hideInstructions = localStorage.getItem('hideInstructions');
    setShowInstructions(hideInstructions !== 'true');
  };

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
    // Update visibility on mount
    updateInstructionsVisibility();

    const handleInteraction = (event) => {
      const isOverlayInteraction = event.target.closest('.instructions-overlay');
      if (isOverlayInteraction) return;

      lastInteractionRef.current = Date.now();
      setShowInstructions(false);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        const timeSinceLastInteraction = Date.now() - lastInteractionRef.current;
        if (timeSinceLastInteraction >= 5000) {
          updateInstructionsVisibility();
        }
      }, 5000);
    };

    const handleMouseDown = (e) => {
      if (!e.target.closest('.instructions-overlay')) {
        isDraggingRef.current = true;
        handleInteraction(e);
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleMouseMove = (e) => {
      if (isDraggingRef.current) {
        handleInteraction(e);
      }
    };

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      if (!e.target.closest('.instructions-overlay')) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (!e.target.closest('.instructions-overlay')) {
        const deltaX = Math.abs(e.touches[0].clientX - touchStartX);
        const deltaY = Math.abs(e.touches[0].clientY - touchStartY);

        if (deltaX > 10 || deltaY > 10) {
          handleInteraction(e);
        }
      }
    };

    const handleClick = (e) => {
      if (!e.target.closest('.instructions-overlay')) {
        handleInteraction(e);
      }
    };

    const handleDblClick = (e) => {
      if (!e.target.closest('.instructions-overlay')) {
        handleInteraction(e);
      }
    };

    const handleKeyPress = (e) => {
      const relevantKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Escape', 'Enter'];
      if (relevantKeys.includes(e.key)) {
        handleInteraction(e);
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('click', handleClick);
    window.addEventListener('dblclick', handleDblClick);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('keydown', handleKeyPress);

    timeoutRef.current = setTimeout(() => {
      if (hideInstructions === 'true') return;
      setShowInstructions(true);
    }, 5000);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('dblclick', handleDblClick);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyPress);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Scene ready={ready} />
      {showInstructions && (
        <InstructionsOverlay 
          onHide={() => {
            setShowInstructions(false);
            lastInteractionRef.current = Date.now();
          }} 
        />
      )}
    </div>
  );
};

export default Deforestation;
