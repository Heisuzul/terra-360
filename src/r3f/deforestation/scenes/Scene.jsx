import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Terrain from '../meshes/Terrain';
import AmbientLight from '../lights/AmbientLight';
import DirectionalLight from '../lights/DirectionalLight';
import Trees from '../meshes/Trees';
import { useRef } from 'react';


const Scene = () => {
  const terrainRef = useRef();

  const handleTerrainLoad = (terrain) => {
    terrainRef.current = terrain;
    console.log("Terrain loaded", terrain);
  };

  return (
    <Canvas shadows camera={{ position: [-28, 10, 20] }}>
      <ambientLight intensity={0.5} />
      <OrbitControls />
      <AmbientLight intensity={1.5} color="#ffffff" />
      <DirectionalLight intensity={2} position={[30, 50, 20]}/>
      <mesh name="ball" position={[-2, 10, 0]} scale={2} metallness={0.1} castShadow>
        <sphereGeometry args={[1, 16, 32]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <Terrain onTerrainLoad={handleTerrainLoad} />
      <Trees terrain={terrainRef} />
    </Canvas>
  );
};

export default Scene;