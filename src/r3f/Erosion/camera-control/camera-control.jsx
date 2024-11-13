import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

// CameraControl component to manage camera position and rotation
const CameraControl = () => {
  const { camera } = useThree();  // Access the Three.js camera object from the scene
  const [scrollPosition, setScrollPosition] = useState(0);  // State to track scroll position

  // Initial and target camera position (Vector3) and rotation (Euler)
  const initialPosition = new THREE.Vector3(0.52, 0.42, 0.24);
  const targetPosition = new THREE.Vector3(0.33, 0.58, 0.11);
  const initialRotation = new THREE.Euler(-0.85, 0.83, 0.75);
  const targetRotation = new THREE.Euler(-1.22, -1.12, -1.19);

  const maxScroll = 1000;  // Maximum scroll value to limit camera movement

  // Effect to handle mouse wheel scroll input
  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();  // Prevent the default scroll behavior (page scroll)

      // Update the scroll position based on the scroll delta
      setScrollPosition((prevScrollPosition) => {
        return Math.min(Math.max(prevScrollPosition + event.deltaY * 0.35, 0), maxScroll);
      });
    };

    // Add event listener for mouse wheel scroll
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      // Cleanup event listener when the component is unmounted
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Effect to handle arrow key press input for quick camera movement
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        // Move camera to target position on right arrow press
        setScrollPosition(maxScroll);
      } else if (event.key === 'ArrowLeft') {
        // Move camera to initial position on left arrow press
        setScrollPosition(0);
      }
    };

    // Add event listener for keydown events
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      // Cleanup event listener when the component is unmounted
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Effect to animate camera based on scroll position
  useEffect(() => {
    const animateCamera = () => {
      const scrollFactor = scrollPosition / maxScroll;  // Calculate how far the camera should move

      // Interpolate the camera's position between initial and target positions
      camera.position.lerpVectors(initialPosition, targetPosition, scrollFactor);

      // Interpolate the camera's rotation between initial and target rotations
      camera.rotation.set(
        initialRotation.x + (targetRotation.x - initialRotation.x) * scrollFactor,
        initialRotation.y + (targetRotation.y - initialRotation.y) * scrollFactor,
        initialRotation.z + (targetRotation.z - initialRotation.z) * scrollFactor
      );

      // Request the next animation frame to keep animating the camera
      requestAnimationFrame(animateCamera);
    };

    animateCamera();  // Start animating the camera

  }, [scrollPosition, camera]);  // Depend on scrollPosition and camera to update the animation

  return null;  // This component does not render any JSX elements
};

export default CameraControl;  // Export the CameraControl component for use in the scene


