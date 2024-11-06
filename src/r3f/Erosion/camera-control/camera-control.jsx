import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const CameraControl = () => {
  const { camera } = useThree();
  const [scrollPosition, setScrollPosition] = useState(0);  

  const initialPosition = new THREE.Vector3(0.52, 0.42, 0.24); 
  const targetPosition = new THREE.Vector3(0.33, 0.58, 0.11);  

  const initialRotation = new THREE.Euler(-0.85, 0.83, 0.75);  
  const targetRotation = new THREE.Euler(-1.22, -1.12, -1.19); 

  const maxScroll = 1000; 

  useEffect(() => {
    
    const handleWheel = (event) => {
      event.preventDefault(); 

      setScrollPosition((prevScrollPosition) => {
        return Math.min(Math.max(prevScrollPosition + event.deltaY * 0.35, 0), maxScroll);
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(() => {

    const animateCamera = () => {

      const scrollFactor = scrollPosition / maxScroll;


      camera.position.lerpVectors(initialPosition, targetPosition, scrollFactor);

      camera.rotation.set(
        initialRotation.x + (targetRotation.x - initialRotation.x) * scrollFactor,
        initialRotation.y + (targetRotation.y - initialRotation.y) * scrollFactor,
        initialRotation.z + (targetRotation.z - initialRotation.z) * scrollFactor
      );


      requestAnimationFrame(animateCamera);
    };


    animateCamera();
  }, [scrollPosition, camera]);

  return null;
};

export default CameraControl;

