import { useState } from 'react';
import { Environment } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Staging component sets up an environment with dynamic HDR background.
 * - Changes HDR image and environment scale based on camera position.
 * - Provides dynamic lighting and atmospheric effects to the scene.
 */
const Staging = ({ instructionsVisible }) => {
  const { camera } = useThree();  // Access the camera object from the 3D scene
  const [hdrFile, setHdrFile] = useState('/hdris/erosion/dikhololo_night_2k.hdr');  // Initial HDR file path
  const [scale, setScale] = useState(2);  // Initial scale for the environment

  // Initial, target, and new positions for the camera
  const positionA = new THREE.Vector3(0.52, 0.42, 0.24);  // Position A
  const positionB = new THREE.Vector3(0.33, 0.58, 0.11);  // Position B
  const positionC = new THREE.Vector3(0.099, 0.641, 1.121);  // Position C

  // `useFrame` hook runs on each frame to check the camera's position and update HDR
  useFrame(() => {
    if (instructionsVisible) return; // Prevent environment changes if instructions are visible

    const currentDistanceToA = camera.position.distanceTo(positionA);  // Distance to position A
    const currentDistanceToB = camera.position.distanceTo(positionB);  // Distance to position B
    const currentDistanceToC = camera.position.distanceTo(positionC);  // Distance to position C

    const threshold = 0.1;  // Distance threshold for switching HDR images

    // If the camera is close to position A, set the first HDR image and scale
    if (currentDistanceToA < threshold) {
      if (hdrFile !== '/hdris/erosion/dikhololo_night_2k.hdr') {
        setHdrFile('/hdris/erosion/dikhololo_night_2k.hdr');
        setScale(2);  // Set scale for the environment at position A
      }
    } 
    // If the camera is close to position B, switch to a different HDR and scale
    else if (currentDistanceToB < threshold) {
      if (hdrFile !== '/hdris/erosion/industrial_sunset_2k.hdr') {
        setHdrFile('/hdris/erosion/industrial_sunset_2k.hdr');
        setScale(5);  // Set a different scale for the environment at position B
      }
    } 
    // If the camera is close to position C, set a new HDR and scale
    else if (currentDistanceToC < threshold) {
      if (hdrFile !== '/hdris/erosion/dikhololo_night_2k.hdr') {
        setHdrFile('/hdris/erosion/dikhololo_night_2k.hdr');  // New HDR for position C
        setScale(8);  // Set a different scale for position C
      }
    }
  });

  return (
    <Environment
      ground={{
        height: 30,  // Height of the ground for environment rendering
        radius: 400,  // Radius of the ground area
        scale: scale,  // Scale of the environment based on camera position
      }}
      files={hdrFile}  // HDR file used for the background and lighting
      background={true}  // Enables background environment lighting
    />
  );
};

export default Staging;  // Export the Staging component

