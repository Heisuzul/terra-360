import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Tumbleweed from '/src/r3f/Erosion/meshes/tumble-weed';
import Terrain from '/src/r3f/Erosion/meshes/terrain';
import Lights from '/src/r3f/Erosion/lights/lights';
import DesertForest from '/src/r3f/Erosion/meshes/desert-forest';
import Rocks from '/src/r3f/Erosion/meshes/rocks';


const Scene = () => {
  const desertRef = useRef();

  const handleDesertLoad = (desert) => {
    desertRef.current = desert;
  };

  return (
    <Canvas shadows camera={{ position: [0.52, 0.42, 0.24], fov: 60, rotation: [-0.85, 0.83, 0.75] }}>

      <Lights />
      <Terrain handleDesertLoad={handleDesertLoad} />
      <DesertForest />
      <Rocks position={[-0.37, 0.15, -0.4]} scale={[0.022, 0.02, 0.02]} />
      <Tumbleweed position={[0.1, 0.049, 0.1]} scale={[0.01, 0.01, 0.01]} />

      {/*<OrbitControls />*/}
    </Canvas>
  );
};

export default Scene;

