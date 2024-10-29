import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Tumbleweed from '/src/r3f/Erosion/meshes/tumble-weed';
import Terrain from '/src/r3f/Erosion/meshes/terrain';
import Lights from '/src/r3f/Erosion/lights/lights';
import DesertForest from '/src/r3f/Erosion/meshes/desert-forest';
import Rocks from '/src/r3f/Erosion/meshes/rocks';
import Staging from '/src/r3f/Erosion/staging/staging';
import DescriptionText from '/src/r3f/Erosion/Texts/description-text-erosion';
import './scene.css';

/**
 * Main 3D Scene component rendering a desert environment.
 * - Configures camera properties and adds environment elements.
 */
const Scene = () => {
  const desertRef = useRef(); // Reference to the Desert component

  /**
   * Sets the desert reference after it loads.
   * @param {Object} desert - The loaded desert object.
   */
  const handleDesertLoad = (desert) => {
    desertRef.current = desert;
  };

  return (
    <div className="scene-container">
      <Canvas
        shadows
        camera={{
          position: [0.52, 0.42, 0.24],  // Camera position in the scene
          fov: 60,                       // Field of view of the camera
          rotation: [-0.85, 0.83, 0.75]  // Camera rotation for initial angle
        }}
      >
        {/* Scene elements */}
        <Staging />             {/* Environment lighting and staging */}
        <Lights />              {/* Main light sources for the scene */}
        <Terrain handleDesertLoad={handleDesertLoad} /> {/* Terrain component with desert loading */}
        <DesertForest />        {/* Desert forest vegetation */}
        <Rocks position={[-0.37, 0.15, -0.4]} scale={[0.022, 0.02, 0.02]} /> {/* Rocks with specified position and scale */}
        <Tumbleweed position={[0.1, 0.049, 0.1]} scale={[0.01, 0.01, 0.01]} /> {/* Tumbleweed object */}
        <DescriptionText />     {/* Text element providing scene description */}

        {/*<OrbitControls /> Uncomment to enable camera controls */}
      </Canvas>
    </div>
  );
};

export default Scene;

