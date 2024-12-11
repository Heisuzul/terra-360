import { useEffect, useState, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { PositionalAudio } from '@react-three/drei';
import * as THREE from 'three';

const SoundControl = ({ isMuted }) => {
  const { camera } = useThree();
  const [currentClosest, setCurrentClosest] = useState(null);
  const [isPositionChecked, setIsPositionChecked] = useState(false);

  const positionA = new THREE.Vector3(0.52, 0.42, 0.24);
  const positionB = new THREE.Vector3(0.33, 0.58, 0.11);
  const positionC = new THREE.Vector3(0.099, 0.641, 1.121);

  const soundARef = useRef(null);
  const soundBRef = useRef(null);
  const soundCRef = useRef(null);

  const getDistance = (targetPosition) => camera.position.distanceTo(targetPosition);

  useEffect(() => {
    if (isMuted) {
      [soundARef, soundBRef, soundCRef].forEach(ref => {
        if (ref.current && ref.current.isPlaying) ref.current.stop();
      });
      setIsPositionChecked(false);
      return;
    }

    if (!isPositionChecked) {
      setIsPositionChecked(true);
    }

    const handlePositionChange = () => {
      if (!isPositionChecked) return;

      const distanceToA = getDistance(positionA);
      const distanceToB = getDistance(positionB);
      const distanceToC = getDistance(positionC);

      const distances = { A: distanceToA, B: distanceToB, C: distanceToC };
      const closest = Object.keys(distances).reduce((closest, key) =>
        distances[key] < distances[closest] ? key : closest
      , 'A');

      if (closest !== currentClosest) {
        setCurrentClosest(closest); 
        [soundARef, soundBRef, soundCRef].forEach((ref, index) => {
          const isCurrent = (index === 0 && closest === 'A') ||
                            (index === 1 && closest === 'B') ||
                            (index === 2 && closest === 'C');
          if (ref.current && ref.current.isPlaying && !isCurrent) {
            ref.current.stop(); 
          }
        });

        if (closest === 'A' && soundARef.current && !soundARef.current.isPlaying) {
          soundARef.current.setVolume(0.1);
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

    const intervalId = setInterval(handlePositionChange, 200); 

    return () => clearInterval(intervalId); 

  }, [camera.position, isMuted, currentClosest, isPositionChecked]); 

  return (
    <>
      <PositionalAudio ref={soundARef} url="/sounds/desert-monolith.mp3" />
      <PositionalAudio ref={soundBRef} url="/sounds/farm-rooster.mp3" />
      <PositionalAudio ref={soundCRef} url="/sounds/nature-sounds.mp3" />
    </>
  );
};

export default SoundControl;