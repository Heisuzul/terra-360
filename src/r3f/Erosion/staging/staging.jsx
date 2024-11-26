import { useState } from 'react';
import { Environment } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Staging component sets up an environment with dynamic HDR background.
 * - Changes HDR image and environment scale based on camera position.
 * - Provides dynamic lighting and atmospheric effects to the scene.
 */

const Staging = () => {
  const { camera } = useThree();  // Access the camera object from the 3D scene
  const [hdrFile, setHdrFile] = useState('/hdris/erosion/dikhololo_night_2k.hdr');  // Initial HDR file path
  const [scale, setScale] = useState(2);  // Initial scale for the environment

  // Initial and target camera positions to trigger HDR and scale changes
  const initialPosition = new THREE.Vector3(0.52, 0.42, 0.24);  // Camera's initial position
  const targetPosition = new THREE.Vector3(0.33, 0.58, 0.11);  // Camera's target position

  // `useFrame` hook runs on each frame to check the camera's position and update HDR
  useFrame(() => {
    const currentDistanceToInitial = camera.position.distanceTo(initialPosition);  // Distance to the initial position
    const currentDistanceToTarget = camera.position.distanceTo(targetPosition);  // Distance to the target position

    const threshold = 0.1;  // Distance threshold for switching HDR images

    // If the camera is close to the initial position, set the first HDR image and scale
    if (currentDistanceToInitial < threshold) {
      if (hdrFile !== '/hdris/erosion/dikhololo_night_2k.hdr') {
        setHdrFile('/hdris/erosion/dikhololo_night_2k.hdr');
        setScale(2);  // Set scale for the environment at initial position
      }
    } else if (currentDistanceToTarget < threshold) {
      // If the camera is close to the target position, switch to a different HDR and scale
      if (hdrFile !== '/hdris/erosion/industrial_sunset_2k.hdr') {
        setHdrFile('/hdris/erosion/industrial_sunset_2k.hdr');
        setScale(5);  // Set a different scale for the environment at target position
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
