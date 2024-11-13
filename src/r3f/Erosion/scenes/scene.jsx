import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Tumbleweed from '/src/r3f/Erosion/meshes/tumble-weed';
import Farm from '/src/r3f/Erosion/meshes/farm-low-poly';
import Terrain from '/src/r3f/Erosion/meshes/terrain';
import Lights from '/src/r3f/Erosion/lights/lights';
import DesertForest from '/src/r3f/Erosion/meshes/desert-forest';
import Rocks from '/src/r3f/Erosion/meshes/rocks';
import Staging from '/src/r3f/Erosion/staging/staging';
import CameraControl from '/src/r3f/Erosion/camera-control/camera-control';
import DescriptionText from '/src/r3f/Erosion/Texts-and-buttons/description-text-erosion';
import CausesText from '/src/r3f/Erosion/Texts-and-buttons/causes-text-erosion';
import HomeButton from '/src/r3f/Erosion/Texts-and-buttons/home-button'; 
import './scene.css';

/**
 * Scene component renders a 3D environment with various objects.
 * - Includes terrain, farm, desert forest, tumbleweed, rocks, and more.
 * - Includes lighting, camera controls, and text for a descriptive scene.
 * - A home button is included for navigation.
 */

const Scene = () => {
  const desertRef = useRef();  // Ref for the desert object
  const farmRef = useRef();  // Ref for the farm object

  // Handle loading of desert mesh (stores reference in desertRef)
  const handleDesertLoad = (desert) => {
    desertRef.current = desert;
  };

  // Handle loading of farm mesh (stores reference in farmRef)
  const handleFarmLoad = (farm) => {
    farmRef.current = farm;
  };

  // Placeholder function for the home button click (can be extended later)
  const handleHomeButtonClick = () => {
    // Logic for handling home button click
  };

  return (
    <div className="scene-container">
      {/* Canvas element for the 3D scene */}
      <Canvas
        shadows  // Enable shadows in the 3D scene
        camera={{
          position: [0.52, 0.42, 0.24],  // Initial camera position
          fov: 60,  // Field of view for the camera
          rotation: [-0.85, 0.83, 0.75]  // Initial camera rotation
        }}
      >
        {/* Include various 3D components in the scene */}
        <CameraControl />  {/* Manages camera movements */}
        <Staging />  {/* Scene staging (could include background, floor, etc.) */}
        <Lights />  {/* Lighting for the scene */}
        
        {/* 3D objects */}
        <Terrain handleDesertLoad={handleDesertLoad} />  {/* The terrain mesh */}
        <Farm handleDesertLoad={handleFarmLoad} position={[3, -0.4, 0.1]} />  {/* The farm mesh */}
        <DesertForest />  {/* The desert forest mesh */}
        <Rocks position={[-0.37, 0.15, -0.4]} scale={[0.022, 0.02, 0.02]} />  {/* Rocks mesh */}
        <Tumbleweed position={[0.1, 0.049, 0.1]} scale={[0.01, 0.01, 0.01]} />  {/* Tumbleweed mesh */}

        {/* Texts */}
        <DescriptionText />  {/* Text describing the erosion scene */}
        <CausesText />  {/* Text describing the causes of erosion */}
      </Canvas>

      {/* Home button for navigation */}
      <HomeButton onClick={handleHomeButtonClick} label="Inicio" />
    </div>
  );
};

export default Scene;  // Export the Scene component
