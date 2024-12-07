import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Tumbleweed from '/src/r3f/Erosion/meshes/tumble-weed';
import Farm from '/src/r3f/Erosion/meshes/farm-low-poly';
import Terrain from '/src/r3f/Erosion/meshes/terrain';
import Lights from '/src/r3f/Erosion/lights/lights';
import DesertForest from '/src/r3f/Erosion/meshes/desert-forest';
import Forest_with_river from '/src/r3f/Erosion/meshes/forest-with-river';
import Rocks from '/src/r3f/Erosion/meshes/rocks';
import Staging from '/src/r3f/Erosion/staging/staging';
import CameraControl from '/src/r3f/Erosion/camera-control/camera-control';
import DescriptionText from '/src/r3f/Erosion/Texts-and-buttons/description-text-erosion';
import CausesText from '/src/r3f/Erosion/Texts-and-buttons/causes-text-erosion';
import HomeButton from '/src/r3f/Erosion/Texts-and-buttons/home-button';
import Instructions from '/src/r3f/Erosion/Texts-and-buttons/instructions';
import { Physics } from '@react-three/rapier';
import './scene.css';

/**
 * The Scene component renders a 3D environment with various objects and interactions.
 * - It includes terrain, farm, desert forest, tumbleweed, rocks, and more.
 * - The scene features camera controls, lights, and descriptive texts.
 * - It also displays instructions when the user first visits the scene, which can be dismissed.
 */

const Scene = () => {
  // Refs to store references to the loaded 3D models (Desert and Farm)
  const desertRef = useRef();
  const farmRef = useRef();

  // State to manage the visibility of the instructions
  const [instructionsVisible, setInstructionsVisible] = useState(true);

  /**
   * Function to hide the instructions when the user clicks the "Hide" button
   */
  const handleHideInstructions = () => {
    setInstructionsVisible(false); // Set instructions visibility to false when dismissed
  };

  /**
   * Placeholder function for the home button click (can be extended later).
   */
  const handleHomeButtonClick = () => {
    // Logic for handling home button click (navigation, etc.)
  };

  return (
    <div className="scene-container">
      {/* Render Instructions component if visible */}
      {instructionsVisible && <Instructions onHide={handleHideInstructions} />}

      {/* Canvas element to render the 3D scene */}
      <Canvas
        shadows  // Enable shadows in the 3D scene
        camera={{
          position: [0.52, 0.42, 0.24],  // Set initial camera position
          fov: 60,  // Field of view for the camera
          rotation: [-0.85, 0.83, 0.75],  // Initial camera rotation
        }}
      >
        {/* 3D scene elements */}
        <CameraControl instructionsVisible={instructionsVisible} />  {/* Camera control based on the visibility of instructions */}
        <Staging />  {/* Scene background and staging */}
        <Lights />  {/* Lighting for the scene */}

        {/* 3D objects */}
        <Farm position={[3, -0.4, 0.1]} />  {/* Farm mesh */}
        <Forest_with_river  position={[-0.5, 0.5, 1.69]} rotation={[0, 3, 0]} scale={[0.0022, 0.002, 0.002]}/> 
        <Rocks position={[-0.37, 0.15, -0.4]} scale={[0.022, 0.02, 0.02]} />  {/* Rocks mesh */}
        <Physics>
        <Terrain />
        <Tumbleweed position={[0.0626, 1.1, 0.00004025]} scale={[0.01, 0.01, 0.01]} />
        <DesertForest />
        </Physics>

        {/* Descriptive texts */}
        <DescriptionText />  {/* Text describing the erosion scene */}
        <CausesText />  {/* Text describing the causes of erosion */}
      </Canvas>

      {/* Home button for navigation */}
      <HomeButton onClick={handleHomeButtonClick} label="Home" />
    </div>
  );
};

export default Scene;
