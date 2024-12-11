import { useEffect, useState, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { PositionalAudio } from '@react-three/drei';
import * as THREE from 'three';

/**
 * SoundControl Component
 *
 * This component manages 3D positional audio sources in a React Three Fiber scene.
 * It plays the audio closest to the camera's position, ensuring only one sound is active at a time.
 * When muted, all sounds are stopped and remain inactive until unmuted.
 *
 * Props:
 * - isMuted (boolean): Determines whether the sounds should be muted.
 */
const SoundControl = ({ isMuted }) => {
  // Access the Three.js camera object
  const { camera } = useThree();

  // State to track the currently closest sound to the camera
  const [currentClosest, setCurrentClosest] = useState(null);

  // State to ensure position checks only happen when unmuted
  const [isPositionChecked, setIsPositionChecked] = useState(false);

  // Define positions for each sound source
  const positionA = new THREE.Vector3(0.52, 0.42, 0.24);
  const positionB = new THREE.Vector3(0.33, 0.58, 0.11);
  const positionC = new THREE.Vector3(0.099, 0.641, 1.121);

  // Refs to store PositionalAudio components
  const soundARef = useRef(null);
  const soundBRef = useRef(null);
  const soundCRef = useRef(null);

  /**
   * Helper function to calculate the distance between the camera and a target position.
   * @param {THREE.Vector3} targetPosition - The position to measure distance to.
   * @returns {number} - The distance between the camera and the target position.
   */
  const getDistance = (targetPosition) => camera.position.distanceTo(targetPosition);

  useEffect(() => {
    // Stop all sounds and reset checks when muted
    if (isMuted) {
      [soundARef, soundBRef, soundCRef].forEach(ref => {
        if (ref.current && ref.current.isPlaying) ref.current.stop();
      });
      setIsPositionChecked(false);
      return;
    }

    // Enable position checking when unmuted
    if (!isPositionChecked) {
      setIsPositionChecked(true);
    }

    /**
     * Handles the logic for determining the closest sound to the camera
     * and ensuring only that sound is playing.
     */
    const handlePositionChange = () => {
      // Skip processing if position checks are disabled
      if (!isPositionChecked) return;

      // Calculate distances to each sound source
      const distanceToA = getDistance(positionA);
      const distanceToB = getDistance(positionB);
      const distanceToC = getDistance(positionC);

      // Map distances to their respective sounds
      const distances = { A: distanceToA, B: distanceToB, C: distanceToC };

      // Find the closest sound source
      const closest = Object.keys(distances).reduce((closest, key) =>
        distances[key] < distances[closest] ? key : closest
      , 'A');

      // If the closest sound has changed, update the state and play the new closest sound
      if (closest !== currentClosest) {
        setCurrentClosest(closest);

        // Stop all other sounds and play the closest sound
        [soundARef, soundBRef, soundCRef].forEach((ref, index) => {
          const isCurrent = (index === 0 && closest === 'A') ||
                            (index === 1 && closest === 'B') ||
                            (index === 2 && closest === 'C');

          if (ref.current && ref.current.isPlaying && !isCurrent) {
            ref.current.stop();
          }
        });

        // Play the new closest sound if it is not already playing
        if (closest === 'A' && soundARef.current && !soundARef.current.isPlaying) {
          soundARef.current.setVolume(0.25);
          soundARef.current.play();
        } else if (closest === 'B' && soundBRef.current && !soundBRef.current.isPlaying) {
          soundBRef.current.setVolume(0.1);
          soundBRef.current.play();
        } else if (closest === 'C' && soundCRef.current && !soundCRef.current.isPlaying) {
          soundCRef.current.setVolume(0.1);
          soundCRef.current.play();
        }
      }
    };

    // Run position checks every 200ms
    const intervalId = setInterval(handlePositionChange, 200);

    // Cleanup interval on unmount or when muted
    return () => clearInterval(intervalId);
  }, [camera.position, isMuted, currentClosest, isPositionChecked]);

  return (
    <>
      {/* PositionalAudio components for the three sound sources */}
      <PositionalAudio ref={soundARef} url="/sounds/desert-monolith.mp3" />
      <PositionalAudio ref={soundBRef} url="/sounds/farm-rooster.mp3" />
      <PositionalAudio ref={soundCRef} url="/sounds/nature-sounds.mp3" />
    </>
  );
};

export default SoundControl;