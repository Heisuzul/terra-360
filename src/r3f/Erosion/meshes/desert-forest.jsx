import React from 'react';
import { RigidBody } from '@react-three/rapier'; 
import Pine from '/src/r3f/Erosion/meshes/pine-without-leaves';
import Tree from '/src/r3f/Erosion/meshes/tree-without-leaves';


const getRandomPosition = (xRange, zRange, yValue) => {
  const x = Math.random() * (xRange[1] - xRange[0]) + xRange[0];
  const z = Math.random() * (zRange[1] - zRange[0]) + zRange[0];
  return [x, yValue, z];
};

const DesertForest = () => {
  const xRange = [-1.3, -0.8]; 
  const zRange = [-1.3, 0.3];  
  const yValue = 0.019; 

  return (
    <>
      {/* Renderizar los pinos con físicas fijas */}
      {Array.from({ length: 10 }).map((_, index) => {
        const position = getRandomPosition(xRange, zRange, yValue);

        return (
          <RigidBody
            type="fixed" 
            position={position}
            key={`pine-${index}`}
          >
            <Pine
              position={[0, 0, 0]} 
              scale={[0.0001, 0.0001, 0.0001]} 
            />
          </RigidBody>
        );
      })}

      {Array.from({ length: 10 }).map((_, index) => {
        const position = getRandomPosition(xRange, zRange, yValue);

        return (
          <RigidBody
            type="fixed" 
            position={position}
            key={`tree-${index}`}
          >
            <Tree
              position={[0, 0, 0]} 
              scale={[0.0001, 0.0001, 0.0001]} 
            />
          </RigidBody>
        );
      })}
    </>
  );
};

export default DesertForest;


