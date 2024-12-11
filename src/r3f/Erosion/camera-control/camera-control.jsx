import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * CameraControl component to manage camera position and rotation
 * based on both scroll and arrow key input.
 * The camera transitions through predefined stages based on scroll or keyboard input.
 * 
 * @param {boolean} instructionsVisible - A flag to control whether camera controls are active or not
 */
const CameraControl = ({ instructionsVisible }) => {
  const { camera } = useThree();  // Access the Three.js camera object from the scene
  const [scrollPosition, setScrollPosition] = useState(0);  // Track scroll position
  const [currentStage, setCurrentStage] = useState(0);  // Track the current stage (A -> B -> C)

  // Initial, target 1, and target 2 camera position and rotation (Vector3 and Euler)
  const positionA = new THREE.Vector3(0.52, 0.42, 0.24);  // Position A (Camera position at stage A)
  const positionB = new THREE.Vector3(0.33, 0.58, 0.11);  // Position B (Camera position at stage B)
  const positionC = new THREE.Vector3(0.099, 0.641, 1.121);  // Position C (Camera position at stage C)

  const rotationA = new THREE.Euler(-0.85, 0.83, 0.75);  // Rotation for Position A (Euler angles)
  const rotationB = new THREE.Euler(-1.22, -1.12, -1.19);  // Rotation for Position B
  const rotationC = new THREE.Euler(-2.361, 0.997, 2.447);  // Rotation for Position C

  // Define the scroll ranges for transitioning between stages
  const maxScrollAtoB = 500;  // Scroll range from A to B (in pixel distance)
  const maxScrollBtoC = 1000; // Scroll range from B to C (total scroll range for all transitions)

  /**
   * Calculate the distance from the current camera position to a target position.
   * @param {THREE.Vector3} targetPosition - The target position to calculate the distance to.
   * @returns {number} - The distance from the current camera position to the target position.
   */
  const getDistance = (targetPosition) => {
    return camera.position.distanceTo(targetPosition);
  };

  // Effect to handle mouse wheel scroll input
  useEffect(() => {
    if (instructionsVisible) return; // Prevent scroll interaction if instructions are visible

    /**
     * Handle mouse wheel scroll events to update the scroll position.
     * The scroll position determines the current stage and camera transition.
     */
    const handleWheel = (event) => {
      event.preventDefault();  // Prevent the default scroll behavior (page scroll)

      // Update the scroll position based on the scroll delta
      setScrollPosition((prevScrollPosition) => {
        return Math.min(Math.max(prevScrollPosition + event.deltaY * 0.35, 0), maxScrollBtoC);
      });
    };

    // Add event listener for mouse wheel scroll
    window.addEventListener('wheel', handleWheel, { passive: false });

    // Cleanup event listener when the component is unmounted
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [instructionsVisible]);  // Depend on instructionsVisible to disable scroll control when instructions are shown

  // Effect to handle arrow key press input (ArrowRight and ArrowLeft)
  useEffect(() => {
    if (instructionsVisible) return;  // Prevent keyboard interaction if instructions are visible

    /**
     * Handle arrow key presses to transition between stages.
     * - ArrowRight: Move camera to next stage (A -> B -> C)
     * - ArrowLeft: Move camera to previous stage (C -> B -> A)
     */
    const handleKeyDown = (event) => {
      // Calculate distances to positions A, B, and C
      const distanceToA = getDistance(positionA);
      const distanceToB = getDistance(positionB);
      const distanceToC = getDistance(positionC);

      if (event.key === 'ArrowRight') {
        if (distanceToA < distanceToB && distanceToA < distanceToC) {
          // Camera is closest to A, move to B
          setCurrentStage(3);  // Transition to Stage B
        } else if (distanceToB < distanceToA && distanceToB < distanceToC) {
          // Camera is closest to B, move to C
          setCurrentStage(2);  // Transition to Stage C
        }
      } else if (event.key === 'ArrowLeft') {
        if (distanceToC < distanceToA && distanceToC < distanceToB) {
          // Camera is closest to C, move to B
          setCurrentStage(4);  // Transition to Stage B
        } else if (distanceToB < distanceToA && distanceToB < distanceToC) {
          // Camera is closest to B, move to A
          setCurrentStage(5);  // Transition to Stage A
        }
      }
    };

    // Add event listener for keydown events (ArrowRight and ArrowLeft)
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener when the component is unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [instructionsVisible]);  // Depend on instructionsVisible to disable keyboard control when instructions are shown

  // Effect to determine which stage we are in based on the scroll position
  useEffect(() => {
    if (instructionsVisible) return; // Prevent stage update if instructions are visible

    // Determine the current stage based on the scroll position
    if (scrollPosition < maxScrollAtoB) {
      setCurrentStage(0);  // Stage A -> B
    } else if (scrollPosition < maxScrollBtoC) {
      setCurrentStage(1);  // Stage B -> C
    } else {
      setCurrentStage(2);  // Stage C (no further movement)
    }
  }, [scrollPosition, instructionsVisible]);  // Depend on scrollPosition and instructionsVisible

  // Effect to animate camera based on scroll position and current stage
  useEffect(() => {
    if (instructionsVisible) return;  // Prevent camera movement if instructions are visible

    /**
     * Animate the camera's position and rotation based on the current stage and scroll position.
     * Uses linear interpolation for smooth transitions between stages.
     */
    const animateCamera = () => {
      let scrollFactor;

      // Handle the movement based on the current stage
      if (currentStage === 0) {
        // Moving from A to B
        scrollFactor = scrollPosition / maxScrollAtoB;
        camera.position.lerpVectors(positionA, positionB, scrollFactor);
        camera.rotation.set(
          rotationA.x + (rotationB.x - rotationA.x) * scrollFactor,
          rotationA.y + (rotationB.y - rotationA.y) * scrollFactor,
          rotationA.z + (rotationB.z - rotationA.z) * scrollFactor
        );
      } else if (currentStage === 1) {
        // Moving from B to C
        scrollFactor = (scrollPosition - maxScrollAtoB) / (maxScrollBtoC - maxScrollAtoB);
        
        // Interpolate position
        camera.position.lerpVectors(positionB, positionC, scrollFactor);

        // Interpolate rotation using Quaternions for a smoother transition
        const quatB = new THREE.Quaternion().setFromEuler(rotationB);
        const quatC = new THREE.Quaternion().setFromEuler(rotationC);
        const interpolatedQuat = new THREE.Quaternion().slerpQuaternions(quatB, quatC, scrollFactor);
        camera.rotation.setFromQuaternion(interpolatedQuat);
      } else if (currentStage === 2) {
        // At position C, no further interpolation needed
        camera.position.copy(positionC);
        camera.rotation.copy(rotationC);
      }
      else if (currentStage === 3) {
        // Moving from B to C using ArrowRight
        camera.position.copy(positionB);
        camera.rotation.copy(rotationB);
      }
      else if (currentStage === 4) {
        // Moving from B to A using ArrowLeft
        camera.position.copy(positionB);
        camera.rotation.copy(rotationB);
      }
      else if (currentStage === 5) {
        // Moving from A to C using ArrowLeft
        camera.position.copy(positionA);
        camera.rotation.copy(rotationA);
      }

      // Request the next animation frame to keep animating the camera
      requestAnimationFrame(animateCamera);
    };

    animateCamera();  // Start animating the camera
  }, [scrollPosition, camera, currentStage, instructionsVisible]);  // Depend on scrollPosition, camera, and currentStage

  // This component doesn't render any JSX elements
  return null;
};

export default CameraControl;  // Export the CameraControl component for use in the scene

