import React from 'react';
import DesertLowPoly from '/src/r3f/Erosion/meshes/desert-low-poly';

const Terrain = ({ handleDesertLoad }) => {
  return (
    <group receiveShadow>
      <DesertLowPoly onDesertLoad={handleDesertLoad} position={[0, 0, 0]} scale={[1, 1, 1]} />
      <DesertLowPoly onDesertLoad={handleDesertLoad} position={[-0.9, -0.03, 0]} scale={[1, 1, 1]} />
      <DesertLowPoly onDesertLoad={handleDesertLoad} position={[0, 0, -0.9]} rotation={[0, Math.PI, 0]} scale={[1, 1, 1]} />
      <DesertLowPoly onDesertLoad={handleDesertLoad} position={[-0.9, -0.03, -0.9]} rotation={[0, Math.PI, 0]} scale={[1, 1, 1]} />
    </group>
  );
};

export default Terrain;