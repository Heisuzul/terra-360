import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * CameraControl component to manage camera position and rotation based on user interaction.
 * - The camera's position and rotation interpolate based on mouse scroll or arrow key input.
 * - It adjusts the camera's movement from an initial to a target position and rotation.
 */

const CameraControl = ({ instructionsVisible }) => {
  const { camera } = useThree();  // Access the Three.js camera object from the scene
  const [scrollPosition, setScrollPosition] = useState(0);  // State to track the scroll position

  // Initial and target camera position (Vector3) and rotation (Euler)
  const initialPosition = new THREE.Vector3(0.52, 0.42, 0.24);
  const targetPosition = new THREE.Vector3(0.33, 0.58, 0.11);
  const initialRotation = new THREE.Euler(-0.85, 0.83, 0.75);
  const targetRotation = new THREE.Euler(-1.22, -1.12, -1.19);

  const maxScroll = 1000;  // Maximum scroll value to limit the camera's movement

  /**
   * Effect to handle mouse wheel scroll input.
   * Updates the scroll position when the user scrolls the mouse wheel.
   * The scroll position affects the interpolation between the camera's initial and target positions/rotations.
   */
  useEffect(() => {
    if (instructionsVisible) return;  // If instructions are visible, prevent interaction

    const handleWheel = (event) => {
      event.preventDefault();  // Prevent the default scroll behavior (page scroll)

      // Update the scroll position based on the mouse wheel delta
      setScrollPosition((prevScrollPosition) => {
        return Math.min(Math.max(prevScrollPosition + event.deltaY * 0.35, 0), maxScroll);
      });
    };

    // Add event listener for mouse wheel scroll
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      // Cleanup the event listener when the component is unmounted
      window.removeEventListener('wheel', handleWheel);
    };
  }, [instructionsVisible]);  // Depend on instructionsVisible to enable/disable scroll interaction

  /**
   * Effect to handle arrow key press input.
   * Moves the camera quickly to the target position when the right arrow is pressed, 
   * or back to the initial position when the left arrow is pressed.
   */
  useEffect(() => {
    if (instructionsVisible) return;  // If instructions are visible, prevent interaction

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        setScrollPosition(maxScroll);  // Move camera to the target position when the right arrow is pressed
      } else if (event.key === 'ArrowLeft') {
        setScrollPosition(0);  // Move camera back to the initial position when the left arrow is pressed
      }
    };

    // Add event listener for keydown events (ArrowRight and ArrowLeft)
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      // Cleanup event listener when the component is unmounted
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [instructionsVisible]);  // Depend on instructionsVisible to enable/disable key press interaction

  /**
   * Effect to animate the camera's position and rotation based on the scroll position.
   * The camera's movement is interpolated between the initial and target positions/rotations.
   */
  useEffect(() => {
    if (instructionsVisible) return;  // If instructions are visible, prevent camera animation

    const animateCamera = () => {
      const scrollFactor = scrollPosition / maxScroll;  // Calculate how far the camera should move

      // Interpolate the camera's position between the initial and target positions
      camera.position.lerpVectors(initialPosition, targetPosition, scrollFactor);

      // Interpolate the camera's rotation between the initial and target rotations
      camera.rotation.set(
        initialRotation.x + (targetRotation.x - initialRotation.x) * scrollFactor,
        initialRotation.y + (targetRotation.y - initialRotation.y) * scrollFactor,
        initialRotation.z + (targetRotation.z - initialRotation.z) * scrollFactor
      );

      // Request the next animation frame to keep animating the camera
      requestAnimationFrame(animateCamera);
    };

    animateCamera();  // Start animating the camera

  }, [scrollPosition, camera, instructionsVisible]);  // Depend on scrollPosition, camera, and instructionsVisible

  return null;  // This component does not render any JSX elements
};

export default CameraControl;  // Export the CameraControl component for use in the scene




