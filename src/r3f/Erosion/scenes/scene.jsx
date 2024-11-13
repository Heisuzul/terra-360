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
import HomeButton from '/src/r3f/Erosion/Texts-and-buttons/home-button'; 
import './scene.css';

const Scene = () => {
  const desertRef = useRef();
  const farmRef = useRef();

  const handleDesertLoad = (desert) => {
    desertRef.current = desert;
  };

  const handleFarmLoad = (farm) => {
    farmRef.current = farm;
  };

  const handleHomeButtonClick = () => {
  };

  return (
    <div className="scene-container">
      <Canvas
        shadows
        camera={{
          position: [0.52, 0.42, 0.24],
          fov: 60,
          rotation: [-0.85, 0.83, 0.75]
        }}
      >
        <CameraControl />
        <Staging />
        <Lights />
        <Terrain handleDesertLoad={handleDesertLoad} />
        <Farm handleDesertLoad={handleFarmLoad} position={[3, -0.4, 0.1]} />
        <DesertForest />
        <Rocks position={[-0.37, 0.15, -0.4]} scale={[0.022, 0.02, 0.02]} />
        <Tumbleweed position={[0.1, 0.049, 0.1]} scale={[0.01, 0.01, 0.01]} />
        <DescriptionText />
      </Canvas>

      <HomeButton onClick={handleHomeButtonClick} label="Inicio" />
    </div>
  );
};

export default Scene;