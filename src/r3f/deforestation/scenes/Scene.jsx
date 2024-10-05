import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, SoftShadows, BakeShadows } from '@react-three/drei';
import Terrain from '../meshes/Terrain';
import AmbientLight from '../lights/AmbientLight';
import DirectionalLight from '../lights/directionalLight';


const Scene = () => {
  return (
    <Canvas shadows camera={{ position: [-28, 5, 20] }}>
      <ambientLight intensity={0.5} />
      <OrbitControls />
      <AmbientLight intensity={1.5} color="#ffffff" />
      <DirectionalLight intensity={2} position={[30, 50, 20]}/>
      <mesh name="ball" position={[-2, 10, 0]} scale={2} castShadow>
        <sphereGeometry args={[1, 16, 32]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <Terrain />
    </Canvas>
  );
};

export default Scene;