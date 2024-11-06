// src/r3f/deforestation/lights/DirectionalLight.jsx
import { useHelper } from '@react-three/drei';
import React, { useRef } from 'react';
import { DirectionalLightHelper } from 'three';

const DirectionalLight = ({ 
  intensity = 1, 
  position = [0, 30, 0], 
  color = 'yellow', 
  shadowMapSize = 4096,   // Default shadow map size
  shadowCamera = {
    near: 0.5,
    far: 1000,            // Increase far value to encompass larger scenes
    left: -64,          // Half of the plane size
    right: 64,
    top: 64,
    bottom: -64
  } 
}) => {
  const dlRef = useRef();
  // useHelper(dlRef, DirectionalLightHelper);

  return (
    <directionalLight 
      ref={dlRef} 
      castShadow
      intensity={intensity} 
      position={position} 
      color={color}
      shadow-bias={-0.0001}
      shadow-mapSize-width={shadowMapSize} // Set shadow map size
      shadow-mapSize-height={shadowMapSize}
      shadow-camera-near={shadowCamera.near} // Configure shadow camera
      shadow-camera-far={shadowCamera.far}
      shadow-camera-left={shadowCamera.left}
      shadow-camera-right={shadowCamera.right}
      shadow-camera-top={shadowCamera.top}
      shadow-camera-bottom={shadowCamera.bottom}
      shadow-radius={1}
    />
  );
};

export default DirectionalLight;
