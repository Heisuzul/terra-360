import { useState, useEffect } from 'react'; 
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Lights component provides lighting for the 3D scene.
 * - Includes two directional lights and an ambient light for balanced illumination.
 * - The lights alternate visibility based on camera position.
 */

const Lights = () => {
  const { camera } = useThree();
  const [ambientLightIntensity, setAmbientLightIntensity] = useState(1);
  const [directionalLight1Intensity, setDirectionalLight1Intensity] = useState(2.5);
  const [directionalLight2Intensity, setDirectionalLight2Intensity] = useState(0);
  const [directionalLight1Visible, setDirectionalLight1Visible] = useState(true);
  const [directionalLight2Visible, setDirectionalLight2Visible] = useState(false);

  const initialPosition = new THREE.Vector3(0.52, 0.42, 0.24);
  const targetPosition = new THREE.Vector3(0.33, 0.58, 0.11);

  const light2Position = new THREE.Vector3(5.019756244051259, 1.3721944776728427, 2.3694501225918647);

  useFrame(() => {
    const currentDistanceToInitial = camera.position.distanceTo(initialPosition);
    const currentDistanceToTarget = camera.position.distanceTo(targetPosition);

    const threshold = 0.1;

    if (currentDistanceToInitial < threshold) {
      setAmbientLightIntensity(1);
      setDirectionalLight1Intensity(2.5);
      setDirectionalLight1Visible(true);
      setDirectionalLight2Intensity(0);
      setDirectionalLight2Visible(false);

    } else if (currentDistanceToTarget < threshold) {
      setAmbientLightIntensity(0.2);
      setDirectionalLight1Intensity(0);  
      setDirectionalLight1Visible(false);
      setDirectionalLight2Intensity(3.5);
      setDirectionalLight2Visible(true);
    }
  });

  return (
    <>
      {directionalLight1Visible && (
        <directionalLight
          position={[-1, 5, 0.4]} 
          intensity={directionalLight1Intensity} 
          castShadow
        />
      )}

      {directionalLight2Visible && (
        <directionalLight
          position={light2Position.toArray()} 
          intensity={directionalLight2Intensity} 
          castShadow
        />
      )}

      <ambientLight intensity={ambientLightIntensity} />
    </>
  );
};

export default Lights;
