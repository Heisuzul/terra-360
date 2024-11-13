import { useState, useEffect } from 'react'; 
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Lights component provides lighting for the 3D scene.
 * - Includes two directional lights and an ambient light for balanced illumination.
 * - The lights alternate visibility based on camera position.
 */

const Lights = () => {
  const { camera } = useThree();  // Access the camera object from the 3D scene
  const [ambientLightIntensity, setAmbientLightIntensity] = useState(1);  // Ambient light intensity state
  const [directionalLight1Intensity, setDirectionalLight1Intensity] = useState(2.5);  // Directional light 1 intensity
  const [directionalLight2Intensity, setDirectionalLight2Intensity] = useState(0);  // Directional light 2 intensity
  const [directionalLight1Visible, setDirectionalLight1Visible] = useState(true);  // Directional light 1 visibility state
  const [directionalLight2Visible, setDirectionalLight2Visible] = useState(false);  // Directional light 2 visibility state

  // Initial and target positions for camera interaction with light intensities
  const initialPosition = new THREE.Vector3(0.52, 0.42, 0.24);  // Camera's initial position
  const targetPosition = new THREE.Vector3(0.33, 0.58, 0.11);  // Camera's target position

  // Position for the second directional light
  const light2Position = new THREE.Vector3(5.019756244051259, 1.3721944776728427, 2.3694501225918647);

  // `useFrame` hook is called on every frame to update light properties based on camera position
  useFrame(() => {
    // Calculate the current distance from the camera to the initial and target positions
    const currentDistanceToInitial = camera.position.distanceTo(initialPosition);
    const currentDistanceToTarget = camera.position.distanceTo(targetPosition);

    const threshold = 0.1;  // Distance threshold for switching lights

    // Logic to switch light intensities and visibility based on camera distance to specific positions
    if (currentDistanceToInitial < threshold) {
      // If close to initial position, activate the first directional light and set its intensity
      setAmbientLightIntensity(1);
      setDirectionalLight1Intensity(2.5);
      setDirectionalLight1Visible(true);
      setDirectionalLight2Intensity(0);
      setDirectionalLight2Visible(false);

    } else if (currentDistanceToTarget < threshold) {
      // If close to target position, activate the second directional light and reduce the first one
      setAmbientLightIntensity(0.2);
      setDirectionalLight1Intensity(0);  
      setDirectionalLight1Visible(false);
      setDirectionalLight2Intensity(3.5);
      setDirectionalLight2Visible(true);
    }
  });

  return (
    <>
      {/* Conditional rendering for the first directional light */}
      {directionalLight1Visible && (
        <directionalLight
          position={[-1, 5, 0.4]}  // Light position in 3D space
          intensity={directionalLight1Intensity}  // Light intensity
          castShadow  // Enable shadow casting
        />
      )}

      {/* Conditional rendering for the second directional light */}
      {directionalLight2Visible && (
        <directionalLight
          position={light2Position.toArray()}  // Light position (converted to array for Three.js)
          intensity={directionalLight2Intensity}  // Light intensity
          castShadow  // Enable shadow casting
        />
      )}

      {/* Ambient light with dynamic intensity */}
      <ambientLight intensity={ambientLightIntensity} />
    </>
  );
};

export default Lights;  // Export the Lights component

